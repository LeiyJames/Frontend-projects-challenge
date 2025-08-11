"use client"

import { StoryBar } from "@/components/story-bar"
import { StoryViewer } from "@/components/story-viewer"
import { useStories } from "@/hooks/use-stories"
import { useState } from "react"

export default function HomePage() {
  const { stories, addStory, removeExpiredStories } = useStories()
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean
    currentStoryIndex: number
    stories: any[]
  }>({
    isOpen: false,
    currentStoryIndex: 0,
    stories: [],
  })

  const handleStoryClick = (storyIndex: number) => {
    const validStories = removeExpiredStories()
    setViewerState({
      isOpen: true,
      currentStoryIndex: storyIndex,
      stories: validStories,
    })
  }

  const handleCloseViewer = () => {
    setViewerState((prev) => ({ ...prev, isOpen: false }))
  }

  const handleStoryUpload = (imageData: string) => {
    addStory(imageData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-900">Stories</h1>
        </div>
      </div>

      {/* Story Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto">
          <StoryBar stories={stories} onStoryClick={handleStoryClick} onStoryUpload={handleStoryUpload} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4">
        <div className="text-center text-gray-500 mt-8">
          <p>Upload your first story by tapping the + button above!</p>
          <p className="text-sm mt-2">Stories expire after 24 hours</p>
        </div>
      </div>

      {/* Story Viewer */}
      {viewerState.isOpen && (
        <StoryViewer
          stories={viewerState.stories}
          initialIndex={viewerState.currentStoryIndex}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  )
}
