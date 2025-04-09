"use client"

import { format } from "date-fns"
import { Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/use-tasks"
import { TaskItem } from "@/components/task-item"

export default function TodayPage() {
  const { tasks, isLoading } = useTasks()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const today = new Date()
  const todayTasks = tasks.filter(
    (task) => task.dueDate && format(new Date(task.dueDate), "yyyy-MM-dd") === format(today, "yyyy-MM-dd"),
  )

  const completedTodayTasks = todayTasks.filter((task) => task.completed)
  const pendingTodayTasks = todayTasks.filter((task) => !task.completed)

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Today's Tasks</h1>
          <p className="text-muted-foreground">{format(today, "EEEE, MMMM d, yyyy")}</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-md">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{pendingTodayTasks.length} pending</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks Due Today</CardTitle>
          <CardDescription>Focus on completing these tasks today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingTodayTasks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">No tasks due today. Enjoy your day!</div>
          ) : (
            <div className="grid gap-3">
              {pendingTodayTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {completedTodayTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed Today</CardTitle>
            <CardDescription>Tasks you've already completed today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {completedTodayTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
