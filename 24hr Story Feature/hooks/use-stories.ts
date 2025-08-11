"use client"

import { useState, useEffect } from "react"

interface Story {
  id: number
  image: string
  timestamp: number
  expiresAt: number
}

const STORAGE_KEY = "instagram_stories"
const EXPIRY_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export function useStories() {
  const [stories, setStories] = useState<Story[]>([])

  // Load stories from storage
  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedStories: Story[] = JSON.parse(stored)
        const validStories = parsedStories.filter((story) => story.expiresAt > Date.now())
        setStories(validStories)

        // Update storage with only valid stories
        if (validStories.length !== parsedStories.length) {
          saveStories(validStories)
        }
      }
    } catch (error) {
      console.error("Failed to load stories:", error)
      setStories([])
    }
  }

  const saveStories = (storiesToSave: Story[]) => {
    try {
      const data = JSON.stringify(storiesToSave)
      localStorage.setItem(STORAGE_KEY, data)
    } catch (error) {
      // Fallback to sessionStorage
      try {
        const data = JSON.stringify(storiesToSave)
        sessionStorage.setItem(STORAGE_KEY, data)
      } catch (sessionError) {
        console.error("Failed to save stories:", sessionError)
      }
    }
  }

  const addStory = (imageData: string) => {
    const newStory: Story = {
      id: Date.now() + Math.random(),
      image: imageData,
      timestamp: Date.now(),
      expiresAt: Date.now() + EXPIRY_DURATION,
    }

    const updatedStories = [newStory, ...stories]
    setStories(updatedStories)
    saveStories(updatedStories)
  }

  const removeExpiredStories = () => {
    const validStories = stories.filter((story) => story.expiresAt > Date.now())
    if (validStories.length !== stories.length) {
      setStories(validStories)
      saveStories(validStories)
    }
    return validStories
  }

  const deleteStory = (storyId: number) => {
    const updatedStories = stories.filter((story) => story.id !== storyId)
    setStories(updatedStories)
    saveStories(updatedStories)
  }

  return {
    stories,
    addStory,
    deleteStory,
    removeExpiredStories,
    loadStories,
  }
}
