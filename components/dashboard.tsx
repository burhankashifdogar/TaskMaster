"use client"

import { useState } from "react"
import { CheckCircle2, Clock, AlertCircle, Calendar, ArrowUpRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useTasks } from "@/hooks/use-tasks"
import { TaskItem } from "@/components/task-item"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { format, isToday, isPast, isFuture, addDays } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"

export function Dashboard() {
  const { user } = useAuth()
  const { tasks, isLoading } = useTasks()
  const [showCreateTask, setShowCreateTask] = useState(false)
  const isMobile = useIsMobile()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const today = new Date()
  const todayTasks = tasks.filter((task) => task.dueDate && isToday(new Date(task.dueDate)))

  const overdueTasks = tasks.filter(
    (task) => task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed,
  )

  const upcomingTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      isFuture(new Date(task.dueDate)) &&
      new Date(task.dueDate) <= addDays(today, 7) &&
      !task.completed,
  )

  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)

  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  // Get current time greeting
  const getGreeting = () => {
    const hour = today.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-lg">{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">{getGreeting()}</h2>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{user?.name}</h1>
            </div>
          </div>
          <p className="text-muted-foreground">{format(today, "EEEE, MMMM d, yyyy")}</p>
        </div>
        <Button
          onClick={() => setShowCreateTask(true)}
          className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          size={isMobile ? "default" : "lg"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Create New Task
          </span>
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 stats-grid">
        <Card className="stats-card-today overflow-hidden h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900/30">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-3xl font-bold">{todayTasks.length}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground">
                  {todayTasks.filter((t) => !t.completed).length} pending
                </span>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                  {todayTasks.filter((t) => t.completed).length} completed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card-completion overflow-hidden h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full dark:bg-green-900/30">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-3xl font-bold">{completionRate}%</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {completedTasks.length}/{tasks.length} tasks
                </span>
              </div>
              <div className="space-y-1">
                <Progress value={completionRate} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {completedTasks.length} completed out of {tasks.length} total tasks
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card-overdue overflow-hidden h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-full dark:bg-red-900/30">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-3xl font-bold">{overdueTasks.length}</span>
              </div>
              {overdueTasks.length > 0 ? (
                <Button variant="outline" size="sm" className="gap-1 text-xs" asChild>
                  <a href="/overdue">
                    View all <ArrowUpRight className="h-3 w-3" />
                  </a>
                </Button>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                >
                  All caught up!
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4 w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-12">
          <TabsTrigger value="pending" className="text-xs md:text-sm">
            Pending ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="today" className="text-xs md:text-sm">
            Today ({todayTasks.filter((t) => !t.completed).length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="text-xs md:text-sm">
            Upcoming ({upcomingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs md:text-sm">
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 task-grid">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Pending Tasks
                    {pendingTasks.length > 0 && <Badge variant="secondary">{pendingTasks.length}</Badge>}
                  </CardTitle>
                  <CardDescription>Tasks that need to be completed</CardDescription>
                </div>
                {pendingTasks.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setShowCreateTask(true)}>
                    Add Task
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6">
              {pendingTasks.length === 0 ? (
                <div className="text-center py-8 md:py-12 space-y-3">
                  <div className="flex justify-center">
                    <div className="bg-primary/10 p-3 rounded-full animate-float">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm text-muted-foreground">You have no pending tasks. Great job!</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowCreateTask(true)} className="mt-2">
                    Create a new task
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {pendingTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="space-y-4 task-grid">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Today's Tasks
                    {todayTasks.filter((t) => !t.completed).length > 0 && (
                      <Badge variant="secondary">{todayTasks.filter((t) => !t.completed).length}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Tasks due today ({format(today, "MMMM d, yyyy")})</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6">
              {todayTasks.filter((t) => !t.completed).length === 0 ? (
                <div className="text-center py-8 md:py-12 space-y-3">
                  <div className="flex justify-center">
                    <div className="bg-blue-100 p-3 rounded-full animate-float dark:bg-blue-900/30">
                      <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">No tasks for today!</p>
                    <p className="text-sm text-muted-foreground">You're all caught up for today. Enjoy your day!</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowCreateTask(true)} className="mt-2">
                    Create a task for today
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3 sm:gap-4">
                  {todayTasks
                    .filter((t) => !t.completed)
                    .map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 task-grid">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Upcoming Tasks
                    {upcomingTasks.length > 0 && <Badge variant="secondary">{upcomingTasks.length}</Badge>}
                  </CardTitle>
                  <CardDescription>Tasks due in the next 7 days</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6">
              {upcomingTasks.length === 0 ? (
                <div className="text-center py-8 md:py-12 space-y-3">
                  <div className="flex justify-center">
                    <div className="bg-purple-100 p-3 rounded-full animate-float dark:bg-purple-900/30">
                      <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">No upcoming tasks!</p>
                    <p className="text-sm text-muted-foreground">You have no tasks scheduled for the next 7 days.</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowCreateTask(true)} className="mt-2">
                    Plan ahead
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3 sm:gap-4">
                  {upcomingTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 task-grid">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Completed Tasks
                    {completedTasks.length > 0 && <Badge variant="secondary">{completedTasks.length}</Badge>}
                  </CardTitle>
                  <CardDescription>Tasks you've already completed</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6">
              {completedTasks.length === 0 ? (
                <div className="text-center py-8 md:py-12 space-y-3">
                  <div className="flex justify-center">
                    <div className="bg-green-100 p-3 rounded-full animate-float dark:bg-green-900/30">
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">No completed tasks yet</p>
                    <p className="text-sm text-muted-foreground">Start checking off some tasks to see them here!</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3 sm:gap-4">
                  {completedTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mobile floating action button for creating tasks */}
      {isMobile && (
        <Button
          onClick={() => setShowCreateTask(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
          size="icon"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}

      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
    </div>
  )
}
