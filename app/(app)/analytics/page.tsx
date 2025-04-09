"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTasks } from "@/hooks/use-tasks"
import { BarChart, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval } from "date-fns"

export default function AnalyticsPage() {
  const { tasks, isLoading } = useTasks()
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week")

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Get current date ranges
  const today = new Date()
  const currentWeekStart = startOfWeek(today)
  const currentWeekEnd = endOfWeek(today)
  const currentWeekDays = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd })

  // Filter tasks based on timeframe
  const getFilteredTasks = () => {
    if (timeframe === "week") {
      return tasks.filter(
        (task) =>
          task.dueDate && isWithinInterval(new Date(task.dueDate), { start: currentWeekStart, end: currentWeekEnd }),
      )
    } else if (timeframe === "month") {
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()
      return tasks.filter((task) => {
        const taskDate = new Date(task.dueDate)
        return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear
      })
    } else {
      return tasks
    }
  }

  const filteredTasks = getFilteredTasks()
  const completedTasks = filteredTasks.filter((task) => task.completed)
  const pendingTasks = filteredTasks.filter((task) => !task.completed)
  const overdueTasks = filteredTasks.filter((task) => task.dueDate && new Date(task.dueDate) < today && !task.completed)

  // Calculate completion rate
  const completionRate = filteredTasks.length > 0 ? Math.round((completedTasks.length / filteredTasks.length) * 100) : 0

  // Group tasks by category
  const tasksByCategory = filteredTasks.reduce(
    (acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Group tasks by priority
  const tasksByPriority = filteredTasks.reduce(
    (acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your productivity and task management metrics</p>
        </div>
        <Tabs
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as "week" | "month" | "all")}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 md:w-[300px]">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 dark:from-purple-950/20 dark:to-pink-950/20 dark:border-purple-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-3xl font-bold">{filteredTasks.length}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground">{pendingTasks.length} pending</span>
                <Badge variant="outline" className="bg-purple-50">
                  {completedTasks.length} completed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-3xl font-bold">{completionRate}%</span>
                </div>
              </div>
              <Progress value={completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedTasks.length} of {filteredTasks.length} tasks completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">On-time Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-3xl font-bold">
                  {completedTasks.length > 0
                    ? Math.round(
                        (completedTasks.filter((task) => new Date(task.dueDate) >= new Date(task.createdAt)).length /
                          completedTasks.length) *
                          100,
                      )
                    : 0}
                  %
                </span>
              </div>
              <Badge variant="outline" className="bg-green-50">
                {completedTasks.filter((task) => new Date(task.dueDate) >= new Date(task.createdAt)).length} tasks
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-100 dark:from-red-950/20 dark:to-orange-950/20 dark:border-red-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-3xl font-bold">{overdueTasks.length}</span>
              </div>
              <Badge variant="outline" className="bg-red-50">
                {pendingTasks.length > 0 ? Math.round((overdueTasks.length / pendingTasks.length) * 100) : 0}% of
                pending
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Category</CardTitle>
            <CardDescription>Distribution of tasks across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(tasksByCategory).map(([category, count]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          category === "work"
                            ? "bg-blue-500"
                            : category === "personal"
                              ? "bg-green-500"
                              : category === "dev"
                                ? "bg-purple-500"
                                : category === "health"
                                  ? "bg-pink-500"
                                  : "bg-yellow-500"
                        }`}
                      />
                      <span className="font-medium capitalize">{category}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {count} tasks ({Math.round((count / filteredTasks.length) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(count / filteredTasks.length) * 100}
                    className={`h-2 ${
                      category === "work"
                        ? "bg-blue-100"
                        : category === "personal"
                          ? "bg-green-100"
                          : category === "dev"
                            ? "bg-purple-100"
                            : category === "health"
                              ? "bg-pink-100"
                              : "bg-yellow-100"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
            <CardDescription>Distribution of tasks by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(tasksByPriority).map(([priority, count]) => (
                <div key={priority} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          priority === "low"
                            ? "bg-blue-500"
                            : priority === "medium"
                              ? "bg-yellow-500"
                              : priority === "high"
                                ? "bg-orange-500"
                                : "bg-red-500"
                        }`}
                      />
                      <span className="font-medium capitalize">{priority}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {count} tasks ({Math.round((count / filteredTasks.length) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(count / filteredTasks.length) * 100}
                    className={`h-2 ${
                      priority === "low"
                        ? "bg-blue-100"
                        : priority === "medium"
                          ? "bg-yellow-100"
                          : priority === "high"
                            ? "bg-orange-100"
                            : "bg-red-100"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Task completion throughout the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {currentWeekDays.map((day, i) => {
              const dayTasks = tasks.filter(
                (task) => task.dueDate && format(new Date(task.dueDate), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"),
              )
              const completedDayTasks = dayTasks.filter((task) => task.completed)
              const completionPercentage = dayTasks.length > 0 ? (completedDayTasks.length / dayTasks.length) * 100 : 0

              return (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-xs font-medium">{format(day, "EEE")}</span>
                  <span className="text-xs text-muted-foreground">{format(day, "d")}</span>
                  <div className="mt-2 h-24 w-full bg-muted rounded-md relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-primary transition-all duration-500"
                      style={{ height: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="mt-1 text-xs font-medium">{dayTasks.length}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
