"use client"

import { StoryUpload } from "./story-upload"
import { Plus } from "lucide-react"
import { useState } from "react"

interface Story {
  id: number
  image: string
  timestamp: number
  expiresAt: number
}

interface StoryBarProps {
  stories: Story[]
  onStoryClick: (index: number) => void
  onStoryUpload: (imageData: string) => void
}

export function StoryBar({ stories, onStoryClick, onStoryUpload }: StoryBarProps) {
  const [showUpload, setShowUpload] = useState(false)

  const getTimeRemaining = (expiresAt: number) => {
    const remaining = expiresAt - Date.now()
    const hours = Math.floor(remaining / (1000 * 60 * 60))
    return hours > 0 ? `${hours}h` : "<1h"
  }

  return (
    <>
      <div className="flex items-center gap-4 p-4 overflow-x-auto scrollbar-hide">
        {/* Upload Button */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <button
            onClick={() => setShowUpload(true)}
            className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-6 h-6 text-gray-400" />
          </button>
          <span className="text-xs text-gray-500">Your Story</span>
        </div>

        {/* Story Items */}
        {stories.map((story, index) => (
          <div key={story.id} className="flex-shrink-0 flex flex-col items-center gap-1">
            <button
              onClick={() => onStoryClick(index)}
              className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 hover:scale-105 transition-transform"
            >
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                <img src={story.image || "/placeholder.svg"} alt="Story" className="w-full h-full object-cover" />
              </div>
              {/* Time indicator */}
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-1 py-0.5 text-xs text-gray-600 font-medium shadow-sm">
                {getTimeRemaining(story.expiresAt)}
              </div>
            </button>
            <span className="text-xs text-gray-500 max-w-16 truncate">
              {new Date(story.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && <StoryUpload onUpload={onStoryUpload} onClose={() => setShowUpload(false)} />}
    </>
  )
}
