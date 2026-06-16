import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { type RecyclingResult, VERDICT_META } from "@/lib/recycling-data"

const TONE_STYLES = {
  good: {
    wrap: "border-primary/30 bg-primary/5",
    badge: "bg-primary text-primary-foreground",
    icon: "text-primary",
    Icon: CheckCircle2,
  },
  bad: {
    wrap: "border-destructive/30 bg-destructive/5",
    badge: "bg-destructive text-white",
    icon: "text-destructive",
    Icon: XCircle,
  },
  warn: {
    wrap: "border-accent/50 bg-accent/10",
    badge: "bg-accent text-accent-foreground",
    icon: "text-accent-foreground",
    Icon: AlertTriangle,
  },
  neutral: {
    wrap: "border-border bg-muted/40",
    badge: "bg-secondary text-secondary-foreground",
    icon: "text-muted-foreground",
    Icon: HelpCircle,
  },
} as const

export function RecyclingResultCard({ result }: { result: RecyclingResult }) {
  const meta = VERDICT_META[result.verdict]
  const tone = TONE_STYLES[meta.tone]
  const Icon = tone.Icon

  return (
    <div className={cn("rounded-xl border p-5", tone.wrap)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon className={cn("h-7 w-7 shrink-0", tone.icon)} aria-hidden />
          <div>
            <h3 className="text-lg font-semibold leading-tight">{result.item}</h3>
            <p className="text-sm text-muted-foreground">{result.category}</p>
          </div>
        </div>
        <Badge className={cn("shrink-0", tone.badge)}>{meta.label}</Badge>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground/90">{result.summary}</p>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          What to do
        </p>
        <ul className="space-y-1.5">
          {result.steps.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/60 pt-3 text-sm">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Trash2 className="h-4 w-4" />
          {result.binType}
        </span>
        <span className="text-muted-foreground">
          Confidence: <span className="font-medium text-foreground">{result.confidence}%</span>
        </span>
      </div>
    </div>
  )
}
