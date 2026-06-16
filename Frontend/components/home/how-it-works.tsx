const STEPS = [
  {
    n: "01",
    title: "Show us the item",
    desc: "Snap or upload a photo, or simply describe it to EcoBot in the chat.",
  },
  {
    n: "02",
    title: "AI identifies it",
    desc: "A vision model recognises the material and matches it to Singapore's recycling rules.",
  },
  {
    n: "03",
    title: "Get a clear verdict",
    desc: "See whether it's recyclable, how to prepare it, and which bin it belongs in.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-balance text-3xl font-bold tracking-tight">How it works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-6">
              <span className="text-2xl font-bold text-primary">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { stat: "60%", label: "of Singapore's domestic waste could be recycled" },
            { stat: "4", label: "bin streams mapped: blue, e-waste, textile, cash-for-trash" },
            { stat: "<5s", label: "to get an AI recycling verdict" },
          ].map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="text-3xl font-bold text-foreground">{item.stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
