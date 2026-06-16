import { generateText, Output } from "ai"
import { z } from "zod"

// NOTE: This uses a multimodal model via the Vercel AI Gateway (zero-config).
// To plug in a custom YOLO / Roboflow detector instead, replace the
// generateText call below with a fetch to your model endpoint and map its
// response onto the same `resultSchema` shape.

export const maxDuration = 30

const resultSchema = z.object({
  item: z.string().describe("Short name of the main item, e.g. 'Plastic water bottle'"),
  category: z
    .string()
    .describe("Material category: Plastic, Paper, Glass, Metal, Organic, E-waste, or Other"),
  verdict: z
    .enum(["recyclable", "not-recyclable", "conditional", "unknown"])
    .describe("Recyclability verdict for Singapore's blue bin system"),
  confidence: z.number().min(0).max(100).describe("Confidence 0-100"),
  summary: z.string().describe("One plain-English sentence explaining the verdict"),
  steps: z
    .array(z.string())
    .describe("2-4 short actionable steps to prepare the item for recycling or disposal"),
  binType: z
    .string()
    .describe(
      "Which bin/stream in Singapore: 'Blue Bin', 'E-Waste point', 'Textile bin', 'General waste', etc.",
    ),
})

const SYSTEM = `You are EcoLoop, an expert on Singapore's recycling rules (NEA "Recycle Right" / blue bin system).
Given an image of an item, identify it and decide if it can be recycled in Singapore.
Rules of thumb:
- Clean paper, cardboard, plastic bottles/containers, glass bottles/jars, and metal cans go in the Blue Bin.
- Food-soiled items, tissue, styrofoam, cling wrap, ceramics and broken glass are NOT recyclable in the blue bin.
- Electronics, batteries and bulbs are E-waste. Clothes/fabric are Textile.
- If an item only recycles after cleaning/rinsing/flattening, use "conditional".
- If the image is unclear or not an object, use "unknown".
Be concise and practical.`

export async function POST(req: Request) {
  try {
    const { image } = (await req.json()) as { image?: string }

    if (!image) {
      return Response.json({ error: "No image provided." }, { status: 400 })
    }

    const { experimental_output } = await generateText({
      model: "google/gemini-3.5-flash",
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify this item and tell me if it can be recycled in Singapore.",
            },
            { type: "image", image },
          ],
        },
      ],
      experimental_output: Output.object({ schema: resultSchema }),
    })

    return Response.json(experimental_output)
  } catch (err) {
    console.log("[v0] analyze error:", err)
    return Response.json(
      { error: "Could not analyze the image. Please try again." },
      { status: 500 },
    )
  }
}
