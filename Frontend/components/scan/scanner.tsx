"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Upload, Camera, X, Loader2, RotateCcw, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { RecyclingResultCard } from "@/components/recycling-result-card"
import type { RecyclingResult } from "@/lib/recycling-data"

type Mode = "idle" | "camera"

export function Scanner() {
  const [image, setImage] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>("idle")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RecyclingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    setMode("idle")
  }, [])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  const reset = () => {
    setImage(null)
    setResult(null)
    setError(null)
  }

  const handleFile = (file: File) => {
    reset()
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const startCamera = async () => {
    reset()
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      streamRef.current = stream
      setMode("camera")
      // wait for the video element to mount
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      })
    } catch {
      setError("Couldn't access the camera. Check browser permissions or upload a photo instead.")
    }
  }

  const capture = () => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0)
    setImage(canvas.toDataURL("image/jpeg", 0.9))
    stopCamera()
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Analysis failed")
      }
      const data = (await res.json()) as RecyclingResult
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Capture / upload panel */}
      <Card className="p-5">
        <div className="aspect-square w-full overflow-hidden rounded-xl border border-dashed border-border bg-muted/40">
          {mode === "camera" ? (
            <video
              ref={videoRef}
              playsInline
              muted
              className="h-full w-full object-cover"
            />
          ) : image ? (
            <div className="relative h-full w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt="Item to check for recyclability"
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={reset}
                aria-label="Remove image"
                className="absolute right-2 top-2 rounded-full bg-foreground/70 p-1.5 text-background backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
              <ImageIcon className="h-10 w-10" />
              <p className="text-sm">Upload a photo or use your camera to check an item</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {mode === "camera" ? (
            <>
              <Button onClick={capture} className="flex-1">
                <Camera className="h-4 w-4" />
                Capture
              </Button>
              <Button onClick={stopCamera} variant="outline">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex-1"
              >
                <Upload className="h-4 w-4" />
                Upload photo
              </Button>
              <Button onClick={startCamera} variant="outline" className="flex-1">
                <Camera className="h-4 w-4" />
                Use camera
              </Button>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
              e.target.value = ""
            }}
          />
        </div>

        {image && mode === "idle" && (
          <Button onClick={analyze} disabled={loading} className="mt-3 w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              "Check recyclability"
            )}
          </Button>
        )}
      </Card>

      {/* Result panel */}
      <div className="flex flex-col gap-4">
        {error && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <span>{error}</span>
            <button onClick={() => setError(null)} aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {loading && (
          <Card className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-7 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-16 w-full" />
          </Card>
        )}

        {!loading && result && <RecyclingResultCard result={result} />}

        {!loading && !result && !error && (
          <Card className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <RotateCcw className="h-6 w-6" />
            </span>
            <div>
              <p className="font-medium">Your result appears here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a photo and tap “Check recyclability” to see whether it belongs
                in the blue bin.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
