"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/use-tasks"
import { TaskItem } from "@/components/task-item"
import { Badge } from "@/components/ui/badge"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const { tasks, isLoading } = useTasks()
  const [showCreateTask, setShowCreateTask] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const categoryTasks = tasks.filter((task) => task.category === category)
  const pendingCategoryTasks = categoryTasks.filter((task) => !task.completed)
  const completedCategoryTasks = categoryTasks.filter((task) => task.completed)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-500"
      case "personal":
        return "bg-green-500"
      case "dev":
        return "bg-purple-500"
      case "health":
        return "bg-pink-500"
      case "finance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryBgColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-50"
      case "personal":
        return "bg-green-50"
      case "dev":
        return "bg-purple-50"
      case "health":
        return "bg-pink-50"
      case "finance":
        return "bg-yellow-50"
      default:
        return "bg-gray-50"
    }
  }

  const getCategoryTextColor = (category: string) => {
    switch (category) {
      case "work":
        return "text-blue-800"
      case "personal":
        return "text-green-800"
      case "dev":
        return "text-purple-800"
      case "health":
        return "text-pink-800"
      case "finance":
        return "text-yellow-800"
      default:
        return "text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full ${getCategoryColor(category)}`} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight capitalize">{category} Tasks</h1>
            <p className="text-muted-foreground">
              {categoryTasks.length} {categoryTasks.length === 1 ? "task" : "tasks"} in this category
            </p>
          </div>
        </div>
        <Button onClick={() => setShowCreateTask(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                Pending Tasks
                {pendingCategoryTasks.length > 0 && (
                  <Badge className={`${getCategoryBgColor(category)} ${getCategoryTextColor(category)} border-none`}>
                    {pendingCategoryTasks.length}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Tasks that need to be completed</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingCategoryTasks.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="flex justify-center">
                <div className={`p-3 rounded-full animate-float ${getCategoryBgColor(category)}`}>
                  <span className={`text-2xl font-bold ${getCategoryTextColor(category)}`}>✓</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-medium">All caught up!</p>
                <p className="text-sm text-muted-foreground">You have no pending tasks in the {category} category.</p>
              </div>
              <Button variant="outline" onClick={() => setShowCreateTask(true)} className="mt-2">
                Create a new task
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {pendingCategoryTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {completedCategoryTasks.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Completed Tasks
                  <Badge className={`${getCategoryBgColor(category)} ${getCategoryTextColor(category)} border-none`}>
                    {completedCategoryTasks.length}
                  </Badge>
                </CardTitle>
                <CardDescription>Tasks you've already completed</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {completedCategoryTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} defaultCategory={category} />
    </div>
  )
}
