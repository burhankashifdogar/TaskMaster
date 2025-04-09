"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { Task } from "@/types/task"

type TasksContextType = {
  tasks: Task[]
  addTask: (task: Task) => Promise<void>
  updateTask: (task: Task) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  isLoading: boolean
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem("tasks")
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks))
        } else {
          // Set some sample tasks if none exist
          const sampleTasks: Task[] = [
            {
              id: "1",
              title: "Complete project proposal",
              description: "Finish the proposal for the new client project",
              category: "work",
              priority: "high",
              dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
              completed: false,
              createdAt: new Date(),
            },
            {
              id: "2",
              title: "Fix login bug",
              description: "Debug and fix the authentication issue on the login page",
              category: "dev",
              priority: "urgent",
              dueDate: new Date(),
              completed: false,
              createdAt: new Date(Date.now() - 86400000), // 1 day ago
            },
            {
              id: "3",
              title: "Schedule doctor appointment",
              description: "Call the clinic to schedule annual checkup",
              category: "personal",
              priority: "medium",
              dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
              completed: true,
              createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
            },
          ]
          setTasks(sampleTasks)
          localStorage.setItem("tasks", JSON.stringify(sampleTasks))
        }
      } catch (error) {
        console.error("Failed to load tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = async (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task])
    return Promise.resolve()
  }

  const updateTask = async (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    return Promise.resolve()
  }

  const deleteTask = async (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    return Promise.resolve()
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, isLoading }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
}
