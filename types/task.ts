export type Task = {
  id: string
  title: string
  description?: string
  category: string
  priority: string
  dueDate: Date
  completed: boolean
  createdAt: Date
}
