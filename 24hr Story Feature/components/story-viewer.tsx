"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTouchGestures } from "@/hooks/use-touch-gestures"

interface Story {
  id: number
  image: string
  timestamp: number
  expiresAt: number
}

interface StoryViewerProps {
  stories: Story[]
  initialIndex: number
  onClose: () => void
}

export function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentStory = stories[currentIndex]
  const STORY_DURATION = 5000 // 5 seconds

  // Touch gesture handling
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures({
    onSwipeLeft: nextStory,
    onSwipeRight: prevStory,
    onTap: (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const centerX = rect.width / 2

        if (x > centerX) {
          nextStory()
        } else {
          prevStory()
        }
      }
    },
  })

  function nextStory() {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  function prevStory() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setProgress(0)
    }
  }

  function startProgress() {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current)
    }

    const startTime = Date.now()

    progressIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        const elapsed = Date.now() - startTime
        const newProgress = (elapsed / STORY_DURATION) * 100

        if (newProgress >= 100) {
          setProgress(100)
          clearInterval(progressIntervalRef.current!)
          nextStory()
        } else {
          setProgress(newProgress)
        }
      }
    }, 50)
  }

  useEffect(() => {
    startProgress()

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current)
      }
    }
  }, [currentIndex, isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prevStory()
          break
        case "ArrowRight":
        case " ":
          e.preventDefault()
          nextStory()
          break
        case "Escape":
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  if (!currentStory) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story timestamp */}
      <div className="absolute top-16 left-4 z-10 text-white text-sm opacity-75">
        {new Date(currentStory.timestamp).toLocaleString()}
      </div>

      {/* Navigation buttons (desktop) */}
      <button
        onClick={prevStory}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors hidden md:block"
        disabled={currentIndex === 0}
        style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextStory}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors hidden md:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Story content */}
      <div
        ref={containerRef}
        className="relative w-full h-full max-w-md mx-auto cursor-pointer"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={(e) => onTouchStart(e as any)}
        onMouseMove={(e) => onTouchMove(e as any)}
        onMouseUp={(e) => onTouchEnd(e as any)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={currentStory.image || "/placeholder.svg"}
          alt="Story"
          className="w-full h-full object-contain"
          draggable={false}
        />

        {/* Tap zones for mobile */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 md:hidden" onClick={prevStory} />
          <div className="flex-1 md:hidden" onClick={nextStory} />
        </div>
      </div>

      {/* Story counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white text-sm opacity-75">
        {currentIndex + 1} / {stories.length}
      </div>
    </div>
  )
}
