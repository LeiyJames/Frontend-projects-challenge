"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2, Check, Calendar, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  description: string
  completed: boolean
  createdAt: Date
  dueDate?: Date
  priority: "low" | "medium" | "high"
}

type FilterType = "all" | "active" | "completed"

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")

  // Load tasks from localStorage on component mount
  useEffect(() => {
    loadTasks()
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks()
  }, [tasks])

  const loadTasks = () => {
    try {
      const savedTasks = localStorage.getItem("tasks")
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }))
        setTasks(parsedTasks)
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error)
    }
  }

  const saveTasks = () => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error)
    }
  }

  const addTask = () => {
    if (newTask.trim() === "") return

    const task: Task = {
      id: Date.now().toString(),
      description: newTask.trim(),
      completed: false,
      createdAt: new Date(),
      priority: newTaskPriority,
      dueDate: newTaskDueDate ? new Date(newTaskDueDate) : undefined,
    }

    setTasks((prevTasks) => [...prevTasks, task])
    setNewTask("")
    setNewTaskDueDate("")
    setNewTaskPriority("medium")
  }

  const toggleTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed)
      case "completed":
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-400/30 backdrop-blur-sm"
      case "medium":
        return "bg-amber-500/20 text-amber-300 border-amber-400/30 backdrop-blur-sm"
      case "low":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-sm"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30 backdrop-blur-sm"
    }
  }

  const getPriorityIcon = (priority: string) => {
    const iconClass = "w-3 h-3"
    switch (priority) {
      case "high":
        return <Flag className={`${iconClass} text-red-400`} />
      case "medium":
        return <Flag className={`${iconClass} text-amber-400`} />
      case "low":
        return <Flag className={`${iconClass} text-emerald-400`} />
      default:
        return <Flag className={`${iconClass} text-gray-400`} />
    }
  }

  const isOverdue = (dueDate?: Date) => {
    if (!dueDate) return false
    return new Date() > dueDate
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const filteredTasks = getFilteredTasks()
  const activeTasksCount = tasks.filter((task) => !task.completed).length
  const completedTasksCount = tasks.filter((task) => task.completed).length

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-4 relative overflow-hidden"
      style={{ backgroundImage: `url('/serene-mountain-valley.png')` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20">
          <CardHeader className="text-center pb-8 border-b border-white/10">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Task Tracker
            </CardTitle>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-200 font-medium">{activeTasksCount} Active</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-200 font-medium">{completedTasksCount} Completed</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            {/* Add Task Form */}
            <div className="space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-purple-400/50 focus:ring-purple-400/30 h-12 text-lg transition-all duration-300 hover:bg-white/15"
                  />
                </div>
                <Button
                  onClick={addTask}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 h-12 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-purple-500/25"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Task
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-white/80 mb-2">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                  >
                    <option value="low" className="bg-gray-800 text-white">
                      Low Priority
                    </option>
                    <option value="medium" className="bg-gray-800 text-white">
                      Medium Priority
                    </option>
                    <option value="high" className="bg-gray-800 text-white">
                      High Priority
                    </option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-white/80 mb-2">Due Date</label>
                  <Input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-purple-400/50 focus:ring-purple-400/30 h-12 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {(["all", "active", "completed"] as FilterType[]).map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? "default" : "outline"}
                  onClick={() => setFilter(filterType)}
                  className={`capitalize transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-xl font-semibold ${
                    filter === filterType
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white/10 backdrop-blur-sm border-white/20 text-white/80 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {filterType}
                  {filterType === "active" && activeTasksCount > 0 && (
                    <Badge className="ml-2 bg-blue-500/30 text-blue-200 border-blue-400/30">{activeTasksCount}</Badge>
                  )}
                  {filterType === "completed" && completedTasksCount > 0 && (
                    <Badge className="ml-2 bg-emerald-500/30 text-emerald-200 border-emerald-400/30">
                      {completedTasksCount}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-16 text-white/60">
                  <div className="text-8xl mb-6 animate-bounce">📝</div>
                  <p className="text-2xl font-semibold mb-2 text-white/80">No tasks found</p>
                  <p className="text-lg">
                    {filter === "all" ? "Add your first task to get started!" : `No ${filter} tasks at the moment.`}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`group flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-black/10 transform hover:scale-[1.02] ${
                      task.completed ? "opacity-75" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInUp 0.6s ease-out forwards",
                    }}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                        task.completed
                          ? "bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30"
                          : "border-white/40 hover:border-emerald-400 hover:bg-emerald-500/20 text-white/60 hover:text-emerald-300"
                      }`}
                    >
                      {task.completed && <Check className="w-5 h-5 animate-in zoom-in duration-300" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-semibold text-lg transition-all duration-300 ${
                          task.completed
                            ? "line-through text-white/50 transform scale-95"
                            : "text-white hover:text-purple-200"
                        }`}
                      >
                        {task.description}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <Badge
                          className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityColor(task.priority)} flex items-center gap-1`}
                        >
                          {getPriorityIcon(task.priority)}
                          {task.priority}
                        </Badge>

                        {task.dueDate && (
                          <Badge
                            className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${
                              isOverdue(task.dueDate) && !task.completed
                                ? "bg-red-500/20 text-red-300 border-red-400/30 animate-pulse"
                                : "bg-blue-500/20 text-blue-300 border-blue-400/30"
                            }`}
                          >
                            <Calendar className="w-3 h-3" />
                            {formatDate(task.dueDate)}
                            {isOverdue(task.dueDate) && !task.completed && " (Overdue)"}
                          </Badge>
                        )}

                        <span className="text-xs text-white/40 font-medium">{formatDate(task.createdAt)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => deleteTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0 text-white/40 hover:text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 rounded-xl p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            {tasks.length > 0 && (
              <div className="text-center text-white/60 pt-6 border-t border-white/10">
                <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="font-medium">Total: {tasks.length}</span>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span className="font-medium">Active: {activeTasksCount}</span>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span className="font-medium">Completed: {completedTasksCount}</span>
                  {completedTasksCount > 0 && (
                    <>
                      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                      <span className="font-medium text-emerald-300">
                        {Math.round((completedTasksCount / tasks.length) * 100)}% Complete
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
