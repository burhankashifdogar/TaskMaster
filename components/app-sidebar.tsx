"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Calendar, CheckSquare, Clock, LayoutDashboard, LogOut, Plus, Star, BarChart } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTasks } from "@/hooks/use-tasks"
import { APP_ROUTES, CATEGORY_ROUTES, isAuthRoute } from "@/lib/routes"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { tasks } = useTasks()
  const [showCreateTask, setShowCreateTask] = useState(false)

  // Don't show sidebar on login/register pages
  if (isAuthRoute(pathname)) {
    return null
  }

  // Count tasks for today
  const today = new Date()
  const todayTasks = tasks.filter(
    (task) => task.dueDate && new Date(task.dueDate).toDateString() === today.toDateString() && !task.completed,
  )

  // Count overdue tasks
  const overdueTasks = tasks.filter((task) => task.dueDate && new Date(task.dueDate) < today && !task.completed)

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-md">
                <CheckSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">TaskMaster</h1>
            </div>
            <ThemeToggle variant="ghost" />
          </div>
          <Button
            className="w-full justify-start gap-2 shadow-md hover:shadow-lg transition-all"
            onClick={() => setShowCreateTask(true)}
          >
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">DASHBOARD</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === APP_ROUTES.HOME || pathname === "/dashboard"}>
                    <Link href={APP_ROUTES.HOME}>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === APP_ROUTES.TODAY}>
                    <Link href={APP_ROUTES.TODAY}>
                      <Clock className="h-4 w-4" />
                      <span>Today</span>
                      {todayTasks.length > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {todayTasks.length}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === APP_ROUTES.CALENDAR}>
                    <Link href={APP_ROUTES.CALENDAR}>
                      <Calendar className="h-4 w-4" />
                      <span>Calendar</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {overdueTasks.length > 0 && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === APP_ROUTES.OVERDUE}>
                      <Link href={APP_ROUTES.OVERDUE}>
                        <Star className="h-4 w-4 text-red-500" />
                        <span>Overdue</span>
                        <Badge variant="destructive" className="ml-auto">
                          {overdueTasks.length}
                        </Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === APP_ROUTES.ANALYTICS}>
                    <Link href={APP_ROUTES.ANALYTICS}>
                      <BarChart className="h-4 w-4" />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">CATEGORIES</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === CATEGORY_ROUTES.WORK}>
                    <Link href={CATEGORY_ROUTES.WORK}>
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                      <span>Work</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === CATEGORY_ROUTES.PERSONAL}>
                    <Link href={CATEGORY_ROUTES.PERSONAL}>
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Personal</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === CATEGORY_ROUTES.DEVELOPMENT}>
                    <Link href={CATEGORY_ROUTES.DEVELOPMENT}>
                      <span className="h-3 w-3 rounded-full bg-purple-500" />
                      <span>Development</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === CATEGORY_ROUTES.HEALTH}>
                    <Link href={CATEGORY_ROUTES.HEALTH}>
                      <span className="h-3 w-3 rounded-full bg-pink-500" />
                      <span>Health</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === CATEGORY_ROUTES.FINANCE}>
                    <Link href={CATEGORY_ROUTES.FINANCE}>
                      <span className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Finance</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
    </>
  )
}
