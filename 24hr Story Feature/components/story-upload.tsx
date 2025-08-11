"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload, AlertCircle } from "lucide-react"

interface StoryUploadProps {
  onUpload: (imageData: string) => void
  onClose: () => void
}

export function StoryUpload({ onUpload, onClose }: StoryUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateAndProcessImage = async (file: File) => {
    setError(null)
    setProcessing(true)

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      setProcessing(false)
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB")
      setProcessing(false)
      return
    }

    try {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")!

        // Target dimensions (Instagram story aspect ratio)
        const maxWidth = 1080
        const maxHeight = 1920
        const aspectRatio = 9 / 16

        let { width, height } = img

        // Resize if image is too large
        if (width > maxWidth || height > maxHeight) {
          if (width / height > aspectRatio) {
            // Image is wider than target aspect ratio
            width = maxWidth
            height = width / aspectRatio
          } else {
            // Image is taller than target aspect ratio
            height = maxHeight
            width = height * aspectRatio
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to base64 with compression
        const base64 = canvas.toDataURL("image/jpeg", 0.8)

        // Check localStorage size limit
        try {
          const testKey = "test_" + Date.now()
          localStorage.setItem(testKey, base64)
          localStorage.removeItem(testKey)

          onUpload(base64)
          onClose()
        } catch (e) {
          // Try sessionStorage as fallback
          try {
            const testKey = "test_" + Date.now()
            sessionStorage.setItem(testKey, base64)
            sessionStorage.removeItem(testKey)

            setError("Using session storage (stories will be lost when browser closes)")
            setTimeout(() => {
              onUpload(base64)
              onClose()
            }, 2000)
          } catch (e) {
            setError("Storage limit exceeded. Please try a smaller image.")
          }
        }

        setProcessing(false)
      }

      img.onerror = () => {
        setError("Failed to load image")
        setProcessing(false)
      }

      img.src = URL.createObjectURL(file)
    } catch (e) {
      setError("Failed to process image")
      setProcessing(false)
    }
  }

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      validateAndProcessImage(files[0])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upload Story</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop an image here, or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 hover:text-blue-600 font-medium"
              disabled={processing}
            >
              browse files
            </button>
          </p>
          <p className="text-sm text-gray-500">Max size: 10MB • Recommended: 1080x1920px</p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Processing indicator */}
        {processing && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">Processing image...</p>
          </div>
        )}
      </div>
    </div>
  )
}
