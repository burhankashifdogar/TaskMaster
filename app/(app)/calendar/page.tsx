"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/use-tasks"
import { TaskItem } from "@/components/task-item"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CalendarPage() {
  const { tasks, isLoading } = useTasks()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const isMobile = useIsMobile()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    setSelectedDate(today)
  }

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), date))
  }

  const selectedDateTasks = getTasksForDate(selectedDate)
  const pendingSelectedDateTasks = selectedDateTasks.filter((task) => !task.completed)
  const completedSelectedDateTasks = selectedDateTasks.filter((task) => task.completed)

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Calendar</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
              <CardDescription>Select a date to view tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs md:text-sm font-medium py-2">
                    {day}
                  </div>
                ))}

                {daysInMonth.map((day, i) => {
                  const dayTasks = getTasksForDate(day)
                  const isSelected = isSameDay(day, selectedDate)
                  const isCurrentMonth = isSameMonth(day, currentMonth)

                  return (
                    <Button
                      key={i}
                      variant={isSelected ? "default" : "ghost"}
                      className={`
                        h-10 md:h-12 w-full rounded-md p-0 font-normal text-xs md:text-sm
                        ${!isCurrentMonth ? "text-muted-foreground opacity-50" : ""}
                        ${isToday(day) && !isSelected ? "border border-primary text-primary" : ""}
                      `}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span>{format(day, "d")}</span>
                        {dayTasks.length > 0 && (
                          <div className="flex -space-x-1 mt-1">
                            {dayTasks.length <= 3 ? (
                              dayTasks.map((_, i) => <div key={i} className="h-1 w-1 rounded-full bg-primary" />)
                            ) : (
                              <>
                                <div className="h-1 w-1 rounded-full bg-primary" />
                                <div className="h-1 w-1 rounded-full bg-primary" />
                                <div className="h-1 w-1 rounded-full bg-primary" />
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{format(selectedDate, "MMMM d, yyyy")}</CardTitle>
              <CardDescription>
                {selectedDateTasks.length === 0
                  ? "No tasks scheduled for this day"
                  : `${selectedDateTasks.length} task${selectedDateTasks.length === 1 ? "" : "s"} scheduled`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingSelectedDateTasks.length === 0 && completedSelectedDateTasks.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">No tasks for this day</div>
              ) : (
                <>
                  {pendingSelectedDateTasks.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Pending</h3>
                      {pendingSelectedDateTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  )}

                  {completedSelectedDateTasks.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Completed</h3>
                      {completedSelectedDateTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
