"use client"

import { useState } from "react"
import { Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { CreateTaskDialog } from "@/components/create-task-dialog"

export function MobileHeader({ title }: { title?: string }) {
  const [showCreateTask, setShowCreateTask] = useState(false)

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3 md:hidden">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <AppSidebar />
          </SheetContent>
        </Sheet>

        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button size="icon" onClick={() => setShowCreateTask(true)}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">New Task</span>
        </Button>
      </div>

      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
    </div>
  )
}
