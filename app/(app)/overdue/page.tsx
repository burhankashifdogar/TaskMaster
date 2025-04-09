"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/use-tasks"
import { TaskItem } from "@/components/task-item"
import { AlertCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { isPast, isToday } from "date-fns"

export default function OverduePage() {
  const { tasks, isLoading } = useTasks()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const today = new Date()
  const overdueTasks = tasks.filter(
    (task) => task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed,
  )

  // Group overdue tasks by how many days they are overdue
  const groupedOverdueTasks = overdueTasks.reduce(
    (acc, task) => {
      const dueDate = new Date(task.dueDate)
      const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysOverdue <= 1) {
        acc["1 day"] = [...(acc["1 day"] || []), task]
      } else if (daysOverdue <= 3) {
        acc["2-3 days"] = [...(acc["2-3 days"] || []), task]
      } else if (daysOverdue <= 7) {
        acc["4-7 days"] = [...(acc["4-7 days"] || []), task]
      } else {
        acc["Over a week"] = [...(acc["Over a week"] || []), task]
      }

      return acc
    },
    {} as Record<string, typeof tasks>,
  )

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Overdue Tasks</h1>
          <p className="text-muted-foreground">Tasks that have passed their due date</p>
        </div>
        <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">{overdueTasks.length} overdue</span>
        </div>
      </div>

      {overdueTasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Overdue Tasks</h3>
            <p className="text-muted-foreground max-w-md">
              Great job! You don't have any overdue tasks. Keep up the good work!
            </p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(groupedOverdueTasks).map(([group, tasks]) => (
          <Card key={group} className={group === "Over a week" ? "border-red-200 bg-red-50/30" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {group}
                    <Badge variant={group === "Over a week" ? "destructive" : "outline"} className="ml-2">
                      {tasks.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {group === "1 day"
                      ? "Tasks that were due yesterday"
                      : group === "2-3 days"
                        ? "Tasks that were due 2-3 days ago"
                        : group === "4-7 days"
                          ? "Tasks that were due 4-7 days ago"
                          : "Tasks that were due more than a week ago"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
