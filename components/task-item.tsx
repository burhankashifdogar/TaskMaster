"use client"

import { useState } from "react"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import { Pencil, Trash2, Clock, Calendar, CheckCircle2, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useTasks } from "@/hooks/use-tasks"
import type { Task } from "@/types/task"
import { EditTaskDialog } from "@/components/edit-task-dialog"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type TaskItemProps = {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask } = useTasks()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const isMobile = useIsMobile()

  const handleToggleComplete = () => {
    updateTask({
      ...task,
      completed: !task.completed,
    })
  }

  const handleDelete = () => {
    deleteTask(task.id)
    setShowDeleteDialog(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "urgent":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "category-work"
      case "personal":
        return "category-personal"
      case "dev":
        return "category-dev"
      case "health":
        return "category-health"
      case "finance":
        return "category-finance"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "low":
        return "Low"
      case "medium":
        return "Medium"
      case "high":
        return "High"
      case "urgent":
        return "Urgent"
      default:
        return priority
    }
  }

  const formatDueDate = (date: Date) => {
    const dueDate = new Date(date)
    if (isToday(dueDate)) {
      return "Today"
    } else if (isTomorrow(dueDate)) {
      return "Tomorrow"
    } else {
      return format(dueDate, "MMM d, yyyy")
    }
  }

  const isOverdue =
    task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed

  return (
    <>
      <div
        className={cn(
          "task-card flex items-start justify-between p-3 md:p-4 border rounded-lg transition-all",
          task.completed ? "bg-muted/30" : "hover:bg-accent/50",
          isOverdue && !task.completed ? "border-red-200 bg-red-50/50 dark:border-red-800/50 dark:bg-red-950/20" : "",
        )}
      >
        <div className="flex items-start gap-2 md:gap-3 min-w-0 flex-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className={cn("mt-1 transition-all", task.completed ? "opacity-50" : "")}
          />
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  "font-medium truncate text-sm md:text-base",
                  task.completed ? "line-through text-muted-foreground" : "",
                )}
              >
                {task.title}
              </h3>
              <div className={cn("priority-dot", `priority-${task.priority}`)} />
            </div>
            {task.description && (
              <p
                className={cn(
                  "text-xs md:text-sm text-muted-foreground line-clamp-2",
                  task.completed ? "line-through opacity-70" : "",
                )}
              >
                {task.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className={cn(
                        "flex items-center gap-1 text-xs",
                        isOverdue
                          ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50"
                          : "bg-muted",
                      )}
                    >
                      {isOverdue ? (
                        <>
                          <Clock className="h-3 w-3" />
                          <span className="truncate">Overdue</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="h-3 w-3" />
                          <span className="truncate">{formatDueDate(new Date(task.dueDate))}</span>
                        </>
                      )}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Due: {format(new Date(task.dueDate), "MMMM d, yyyy")}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Badge variant="outline" className={cn("category-badge text-xs", getCategoryColor(task.category))}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </Badge>

              {!isMobile && (
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    task.priority === "urgent"
                      ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50"
                      : task.priority === "high"
                        ? "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/50"
                        : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50"
                          : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50",
                  )}
                >
                  {getPriorityLabel(task.priority)}
                </Badge>
              )}

              {!isMobile && task.completed && (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50 flex items-center gap-1 text-xs"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Completed</span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEditDialog(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteDialog(true)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showEditDialog && <EditTaskDialog task={task} open={showEditDialog} onOpenChange={setShowEditDialog} />}
    </>
  )
}
