"use client"

import { useRef, useState, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Leaf, Send, ImagePlus, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const SUGGESTIONS = [
  "Can I recycle a greasy pizza box?",
  "What do I do with old batteries?",
  "Is bubble tea cup recyclable?",
  "Where do my old clothes go?",
]

type Attachment = { dataUrl: string; name: string }

export function EcoChat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const [input, setInput] = useState("")
  const [attachment, setAttachment] = useState<Attachment | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const busy = status === "streaming" || status === "submitted"

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, busy])

  const pickFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => setAttachment({ dataUrl: reader.result as string, name: file.name })
    reader.readAsDataURL(file)
  }

  const submit = (text: string) => {
    const trimmed = text.trim()
    if ((!trimmed && !attachment) || busy) return

    if (attachment) {
      sendMessage({
        role: "user",
        parts: [
          { type: "text", text: trimmed || "Can I recycle this?" },
          { type: "file", mediaType: "image/jpeg", url: attachment.dataUrl },
        ],
      })
    } else {
      sendMessage({ text: trimmed })
    }
    setInput("")
    setAttachment(null)
  }

  const empty = messages.length === 0

  return (
    <Card className="flex h-[calc(100vh-220px)] min-h-[520px] flex-col overflow-hidden p-0">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Leaf className="h-7 w-7" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Hi, I'm EcoBot</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Ask me about anything you want to recycle — or attach a photo and
              I'll take a look.
            </p>
            <div className="mt-6 grid w-full max-w-md gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {status === "submitted" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                EcoBot is thinking…
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-card p-3 sm:p-4">
        {attachment && (
          <div className="mb-2 inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-1.5 pr-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={attachment.dataUrl || "/placeholder.svg"}
              alt={attachment.name}
              className="h-10 w-10 rounded object-cover"
            />
            <span className="max-w-[140px] truncate text-xs text-muted-foreground">
              {attachment.name}
            </span>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              aria-label="Remove attachment"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-end gap-2"
        >
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach a photo"
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) pickFile(file)
              e.target.value = ""
            }}
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submit(input)
              }
            }}
            rows={1}
            placeholder="Ask about an item, or attach a photo…"
            className="max-h-32 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="icon" disabled={busy || (!input.trim() && !attachment)}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}

function MessageBubble({
  message,
}: {
  message: ReturnType<typeof useChat>["messages"][number]
}) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Leaf className="h-4 w-4" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-foreground",
        )}
      >
        {message.parts.map((part, i) => {
          if (part.type === "text") {
            return (
              <p key={i} className="whitespace-pre-wrap">
                {part.text}
              </p>
            )
          }
          if (part.type === "file" && part.mediaType?.startsWith("image/")) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={part.url || "/placeholder.svg"}
                alt="Attached item"
                className="mt-1 max-h-48 rounded-lg object-cover"
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
