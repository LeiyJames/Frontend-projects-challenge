"use client"

import { useState } from "react"
import { Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import NetflixDashboard from "./components/netflix-dashboard"

export default function NetflixProfiles() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)

  const profiles = [
    { name: "Emenalio", color: "bg-blue-500" },
    { name: "Onyeka", color: "bg-yellow-500" },
    { name: "Thelma", color: "bg-red-500" },
    { name: "Kids", color: "bg-gradient-to-br from-purple-500 via-blue-500 to-green-400", isKids: true },
  ]

  const handleProfileClick = (profileName: string) => {
    setSelectedProfile(profileName)
  }

  if (selectedProfile) {
    return <NetflixDashboard profileName={selectedProfile} onBack={() => setSelectedProfile(null)} />
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* LEIGH Logo */}
      <div className="mb-16">
        <h1 className="text-red-600 text-4xl md:text-5xl font-bold tracking-wider">LEIGH</h1>
        {/* Edit Icon */}
        <div className="absolute top-8 right-8">
          <Edit className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Who's watching text */}
      <h2 className="text-white text-3xl md:text-4xl font-light mb-12 text-center">Who's watching?</h2>

      {/* Profiles Grid */}
      <div className="grid grid-cols-2 gap-8 md:gap-12 mb-16">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleProfileClick(profile.name)}
          >
            <div
              className={`w-24 h-24 md:w-32 md:h-32 rounded-lg ${profile.color} flex items-center justify-center mb-3 group-hover:ring-4 group-hover:ring-white transition-all duration-200`}
            >
              {profile.isKids ? (
                <span className="text-white font-bold text-lg md:text-xl">kids</span>
              ) : (
                <div className="text-white text-3xl md:text-4xl">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    {/* Simple smiley face */}
                    <circle cx="12" cy="15" r="2" fill="currentColor" />
                    <circle cx="28" cy="15" r="2" fill="currentColor" />
                    <path
                      d="M12 25 Q20 30 28 25"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-white text-lg md:text-xl font-light group-hover:text-gray-300 transition-colors">
              {profile.name}
            </span>
          </div>
        ))}
      </div>

      {/* Add Profile Button */}
      <Button
        variant="ghost"
        className="flex flex-col items-center text-white hover:text-gray-300 hover:bg-transparent p-4"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-gray-600 rounded-lg flex items-center justify-center mb-3 hover:border-white transition-colors">
          <Plus className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <span className="text-lg md:text-xl font-light">Add Profile</span>
      </Button>
    </div>
  )
}
