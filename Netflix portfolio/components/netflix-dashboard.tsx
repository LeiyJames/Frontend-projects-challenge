"use client"

import { useState } from "react"
import { ArrowLeft, Search, Bell, User, Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NetflixDashboardProps {
  profileName: string
  onBack: () => void
}

export default function NetflixDashboard({ profileName, onBack }: NetflixDashboardProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const portfolioData = {
    featured: {
      title: "Full-Stack E-Commerce Platform",
      description:
        "A complete e-commerce solution built with Next.js, TypeScript, and Stripe. Features include user authentication, product management, shopping cart, and payment processing.",
      image: "/placeholder.svg?height=600&width=1200&text=E-Commerce+Platform",
      category: "Web Development",
    },
    categories: [
      {
        title: "Web Development Projects",
        items: [
          {
            id: "1",
            title: "React Dashboard",
            image: "/placeholder.svg?height=300&width=500&text=React+Dashboard",
            tech: "React, TypeScript",
          },
          {
            id: "2",
            title: "Next.js Blog",
            image: "/placeholder.svg?height=300&width=500&text=Next.js+Blog",
            tech: "Next.js, MDX",
          },
          {
            id: "3",
            title: "Vue.js App",
            image: "/placeholder.svg?height=300&width=500&text=Vue.js+App",
            tech: "Vue.js, Vuex",
          },
          {
            id: "4",
            title: "Angular CRM",
            image: "/placeholder.svg?height=300&width=500&text=Angular+CRM",
            tech: "Angular, RxJS",
          },
          {
            id: "5",
            title: "Svelte Portfolio",
            image: "/placeholder.svg?height=300&width=500&text=Svelte+Portfolio",
            tech: "Svelte, SvelteKit",
          },
        ],
      },
      {
        title: "Mobile Applications",
        items: [
          {
            id: "6",
            title: "React Native Chat",
            image: "/placeholder.svg?height=300&width=500&text=React+Native+Chat",
            tech: "React Native",
          },
          {
            id: "7",
            title: "Flutter Fitness",
            image: "/placeholder.svg?height=300&width=500&text=Flutter+Fitness",
            tech: "Flutter, Dart",
          },
          {
            id: "8",
            title: "Ionic Weather",
            image: "/placeholder.svg?height=300&width=500&text=Ionic+Weather",
            tech: "Ionic, Angular",
          },
          {
            id: "9",
            title: "Xamarin Banking",
            image: "/placeholder.svg?height=300&width=500&text=Xamarin+Banking",
            tech: "Xamarin, C#",
          },
        ],
      },
      {
        title: "Backend & APIs",
        items: [
          {
            id: "10",
            title: "Node.js API",
            image: "/placeholder.svg?height=300&width=500&text=Node.js+API",
            tech: "Node.js, Express",
          },
          {
            id: "11",
            title: "Python Django",
            image: "/placeholder.svg?height=300&width=500&text=Python+Django",
            tech: "Python, Django",
          },
          {
            id: "12",
            title: "GraphQL Server",
            image: "/placeholder.svg?height=300&width=500&text=GraphQL+Server",
            tech: "GraphQL, Apollo",
          },
          {
            id: "13",
            title: "Microservices",
            image: "/placeholder.svg?height=300&width=500&text=Microservices",
            tech: "Docker, Kubernetes",
          },
        ],
      },
      {
        title: "UI/UX Design",
        items: [
          {
            id: "14",
            title: "Design System",
            image: "/placeholder.svg?height=300&width=500&text=Design+System",
            tech: "Figma, Storybook",
          },
          {
            id: "15",
            title: "Mobile UI Kit",
            image: "/placeholder.svg?height=300&width=500&text=Mobile+UI+Kit",
            tech: "Sketch, Principle",
          },
          {
            id: "16",
            title: "Web Redesign",
            image: "/placeholder.svg?height=300&width=500&text=Web+Redesign",
            tech: "Adobe XD",
          },
          {
            id: "17",
            title: "Brand Identity",
            image: "/placeholder.svg?height=300&width=500&text=Brand+Identity",
            tech: "Illustrator, Photoshop",
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:text-gray-300">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-red-600 text-2xl font-bold tracking-wider">NETFLIX</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
              <a href="#" className="hover:text-gray-300">
                Projects
              </a>
              <a href="#" className="hover:text-gray-300">
                Skills
              </a>
              <a href="#" className="hover:text-gray-300">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 cursor-pointer hover:text-gray-300" />
            <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300" />
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span className="text-sm">{profileName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Project Hero */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${portfolioData.featured.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 flex items-center h-full px-8 md:px-16">
          <div className="max-w-2xl">
            <span className="text-red-600 text-sm font-semibold uppercase tracking-wider">
              {portfolioData.featured.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{portfolioData.featured.title}</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
              {portfolioData.featured.description}
            </p>
            <div className="flex space-x-4">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
                <Play className="w-5 h-5 mr-2" />
                View Project
              </Button>
              <Button
                variant="outline"
                className="border-gray-400 text-white hover:bg-gray-800 px-8 py-3 text-lg bg-transparent"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Categories */}
      <div className="px-8 md:px-16 pb-16 space-y-12">
        {portfolioData.categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
            <div className="relative group">
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-80 cursor-pointer transition-transform duration-300 hover:scale-105"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {hoveredItem === item.id && (
                        <div className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-300">{item.tech}</p>
                            <Button className="mt-4 bg-red-600 hover:bg-red-700">View Details</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
