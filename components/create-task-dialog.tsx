"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useTasks } from "@/hooks/use-tasks"
import { getAISuggestions } from "@/lib/ai-service"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string({
    required_error: "Please select a category.",
  }),
  priority: z.string({
    required_error: "Please select a priority.",
  }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
})

type CreateTaskDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultCategory?: string
}

export function CreateTaskDialog({ open, onOpenChange, defaultCategory }: CreateTaskDialogProps) {
  const { toast } = useToast()
  const { addTask } = useTasks()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMobile = useIsMobile()
  const [aiSuggestions, setAiSuggestions] = useState<{
    category?: string
    priority?: string
    dueDate?: Date
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: defaultCategory || "",
      priority: "",
    },
  })

  const title = form.watch("title")

  const handleGetSuggestions = async () => {
    if (title.length < 3) {
      toast({
        variant: "destructive",
        title: "Title too short",
        description: "Please enter a more descriptive task title for AI suggestions.",
      })
      return
    }

    setIsProcessing(true)
    try {
      const suggestions = await getAISuggestions(title)
      setAiSuggestions(suggestions)

      // Apply suggestions to form
      if (suggestions.category && !defaultCategory) {
        form.setValue("category", suggestions.category)
      }
      if (suggestions.priority) {
        form.setValue("priority", suggestions.priority)
      }
      if (suggestions.dueDate) {
        form.setValue("dueDate", suggestions.dueDate)
      }

      toast({
        title: "AI Suggestions Applied",
        description: "The AI has suggested category, priority, and due date based on your task.",
        variant: "default",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to get suggestions",
        description: "Could not get AI suggestions at this time.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await addTask({
        id: Date.now().toString(),
        ...values,
        completed: false,
        createdAt: new Date(),
      })

      toast({
        title: "Task created",
        description: "Your task has been created successfully.",
      })

      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create task",
        description: "There was an error creating your task.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", isMobile && "p-4 h-[90vh] overflow-auto")}>
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Create New Task
            <div className="bg-primary/10 p-1 rounded-md">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
          </DialogTitle>
          <DialogDescription>
            Add a new task to your list. Use AI to get suggestions for category, priority, and due date.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <div className={cn("flex gap-2", isMobile && "flex-col")}>
                    <FormControl>
                      <Input placeholder="Enter task title..." {...field} className="h-10" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGetSuggestions}
                      disabled={isProcessing || title.length < 3}
                      className="gap-2 whitespace-nowrap"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Get AI Suggestions
                        </>
                      )}
                    </Button>
                  </div>
                  <FormDescription>Enter a descriptive title for your task.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task details..."
                      {...field}
                      className="min-h-[80px] md:min-h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormDescription>Optional: Add more details about your task.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!defaultCategory}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="work">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            Work
                          </div>
                        </SelectItem>
                        <SelectItem value="personal">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Personal
                          </div>
                        </SelectItem>
                        <SelectItem value="dev">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-purple-500" />
                            Development
                          </div>
                        </SelectItem>
                        <SelectItem value="health">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-pink-500" />
                            Health
                          </div>
                        </SelectItem>
                        <SelectItem value="finance">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-500" />
                            Finance
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {aiSuggestions?.category && !defaultCategory && (
                      <div className="mt-1 flex items-center gap-1">
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                          AI Suggested
                        </Badge>
                      </div>
                    )}
                    {defaultCategory && (
                      <div className="mt-1 flex items-center gap-1">
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                          Pre-selected category
                        </Badge>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            Low
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-500" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-orange-500" />
                            High
                          </div>
                        </SelectItem>
                        <SelectItem value="urgent">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Urgent
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {aiSuggestions?.priority && (
                      <div className="mt-1 flex items-center gap-1">
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                          AI Suggested
                        </Badge>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                  {aiSuggestions?.dueDate && (
                    <div className="mt-1 flex items-center gap-1">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                        AI Suggested
                      </Badge>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className={cn(isMobile && "flex-col gap-2")}>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
