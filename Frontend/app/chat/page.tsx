import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { EcoChat } from "@/components/chat/eco-chat"

export const metadata: Metadata = {
  title: "Ask EcoBot — EcoLoop",
  description: "Chat with EcoBot to decide if something can be recycled in Singapore. Attach photos for help.",
}

export default function ChatPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-4 py-8 md:py-10">
        <div className="mb-5">
          <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
            Ask EcoBot
          </h1>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            Describe an item or attach a photo, and EcoBot will help you figure out
            if and how it can be recycled in Singapore.
          </p>
        </div>
        <EcoChat />
      </section>
    </main>
  )
}
