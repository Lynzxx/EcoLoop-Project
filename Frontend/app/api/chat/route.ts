import { streamText, convertToModelMessages, type UIMessage } from "ai"

export const maxDuration = 30

const SYSTEM = `You are EcoBot, EcoLoop's friendly recycling assistant for Singapore.
You help people decide whether an item can be recycled under Singapore's NEA "Recycle Right" / blue bin rules.

Guidelines:
- Be warm, concise and practical. Use short paragraphs or bullet points.
- When the user describes or shows an item, give a clear verdict: can it go in the blue bin, does it need cleaning/preparation first, or is it not recyclable (and where it should go instead — e.g. e-waste, textile bin, general waste).
- Blue bin accepts clean paper/cardboard, plastic bottles & containers, glass bottles/jars, and metal cans.
- NOT accepted: food-soiled items, tissue, styrofoam, cling wrap, ceramics, broken glass.
- Electronics/batteries/bulbs = e-waste. Clothes/fabric = textile bins.
- If the user uploads a photo, identify the item first, then advise.
- If something is genuinely ambiguous, ask one short clarifying question.
- Keep answers focused on recycling; gently redirect off-topic questions.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "google/gemini-3.5-flash",
    system: SYSTEM,
    messages: await convertToModelMessages(messages),
    onError: ({ error }) => {
      console.error("[v0] chat streamText error:", error)
    },
  })

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error("[v0] chat response error:", error)
      return error instanceof Error ? error.message : String(error)
    },
  })
}
