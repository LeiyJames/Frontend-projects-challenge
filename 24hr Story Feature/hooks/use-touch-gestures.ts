"use client"

import { useRef } from "react"

interface TouchGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onTap?: (event: TouchEvent | MouseEvent) => void
  swipeThreshold?: number
}

export function useTouchGestures({ onSwipeLeft, onSwipeRight, onTap, swipeThreshold = 50 }: TouchGestureOptions) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const isDraggingRef = useRef(false)

  const onTouchStart = (e: TouchEvent | MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    touchStartRef.current = {
      x: clientX,
      y: clientY,
      time: Date.now(),
    }
    isDraggingRef.current = false
  }

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!touchStartRef.current) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const deltaX = Math.abs(clientX - touchStartRef.current.x)
    const deltaY = Math.abs(clientY - touchStartRef.current.y)

    // If movement is significant, consider it a drag
    if (deltaX > 10 || deltaY > 10) {
      isDraggingRef.current = true
    }
  }

  const onTouchEnd = (e: TouchEvent | MouseEvent) => {
    if (!touchStartRef.current) return

    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const clientY = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY

    const deltaX = clientX - touchStartRef.current.x
    const deltaY = clientY - touchStartRef.current.y
    const deltaTime = Date.now() - touchStartRef.current.time

    // Check for swipe gestures
    if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight()
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft()
      }
    }
    // Check for tap (short duration, minimal movement)
    else if (!isDraggingRef.current && deltaTime < 300 && onTap) {
      onTap(e)
    }

    touchStartRef.current = null
    isDraggingRef.current = false
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
