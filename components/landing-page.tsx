"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  BarChart,
  CheckSquare,
  ArrowRight,
  BrainCircuit,
  Zap,
  Star,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AUTH_ROUTES } from "@/lib/routes"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Add scroll handling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // If user is logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
        <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6 max-w-screen-xl">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1.5 rounded-md">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              TaskMaster
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              onClick={(e) => handleAnchorClick(e, "features")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleAnchorClick(e, "how-it-works")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleAnchorClick(e, "testimonials")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href={AUTH_ROUTES.LOGIN}>
              <Button variant="ghost" className="hidden md:flex">
                Login
              </Button>
            </Link>
            <Link href={AUTH_ROUTES.REGISTER}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-20 md:py-28 w-full">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-screen-xl">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] w-full">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-purple-100 text-purple-800 border-purple-200 mb-2 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/30">
                    <Sparkles className="mr-1 h-3 w-3" /> AI-Powered Task Management
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Smart Task Management for Busy People
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TaskMaster uses AI to help you organize, prioritize, and complete your tasks more efficiently than
                    ever before.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={AUTH_ROUTES.REGISTER}>
                    <Button
                      size="lg"
                      className="gap-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                    >
                      Start for Free <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="#features" onClick={(e) => handleAnchorClick(e, "features")}>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center rounded-xl border bg-background p-4 shadow-lg lg:p-10 w-full">
                <div className="w-full overflow-hidden rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs font-medium">TaskMaster Dashboard</div>
                    <div className="w-16" />
                  </div>
                  <div className="bg-background p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium">Good morning, Alex</h3>
                          <p className="text-xs text-muted-foreground">Monday, April 8, 2024</p>
                        </div>
                        <Button
                          size="sm"
                          className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
                        >
                          <Sparkles className="mr-1 h-3 w-3" /> New Task
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { icon: Clock, title: "Today", value: "4 tasks" },
                          { icon: CheckCircle2, title: "Completed", value: "85%" },
                          { icon: Calendar, title: "Upcoming", value: "7 tasks" },
                        ].map((item, i) => (
                          <div key={i} className="rounded-lg border bg-card p-2 shadow-sm">
                            <div className="flex flex-col items-center justify-center space-y-1 text-center">
                              <item.icon className="h-4 w-4 text-purple-600" />
                              <div className="text-xs font-medium">{item.title}</div>
                              <div className="text-sm">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-medium">Today's Tasks</div>
                        {[
                          { title: "Complete project proposal", priority: "high", category: "work" },
                          { title: "Review marketing materials", priority: "medium", category: "work" },
                          { title: "Schedule team meeting", priority: "low", category: "work" },
                        ].map((task, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-lg border p-2">
                            <div className="flex h-4 w-4 items-center justify-center rounded-sm border">
                              <CheckCircle2 className="h-3 w-3 text-purple-600 opacity-0" />
                            </div>
                            <div className="flex-1 text-xs">{task.title}</div>
                            <Badge variant="outline" className="text-[10px]">
                              {task.category}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-slate-50 dark:bg-slate-900/50 w-full">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-screen-xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/30">
                  <Sparkles className="mr-1 h-3 w-3" /> Smart Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Tools for Productivity
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  TaskMaster combines intelligent task management with intuitive design to help you accomplish more.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 w-full">
              {[
                {
                  icon: BrainCircuit,
                  title: "AI Suggestions",
                  description:
                    "Get smart recommendations for task categorization, priority, and due dates based on task descriptions.",
                },
                {
                  icon: Calendar,
                  title: "Calendar View",
                  description: "Visualize your tasks in a calendar format to better plan your days, weeks, and months.",
                },
                {
                  icon: BarChart,
                  title: "Analytics",
                  description: "Track your productivity with detailed analytics and insights on task completion rates.",
                },
                {
                  icon: Clock,
                  title: "Due Date Tracking",
                  description: "Never miss a deadline with intelligent due date tracking and reminders.",
                },
                {
                  icon: CheckSquare,
                  title: "Task Categories",
                  description: "Organize tasks by categories like work, personal, development, health, and finance.",
                },
                {
                  icon: Zap,
                  title: "Priority Levels",
                  description: "Assign priority levels to tasks to focus on what matters most.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md bg-white dark:bg-slate-800"
                >
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 w-full">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-screen-xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/30">
                  <Zap className="mr-1 h-3 w-3" /> Simple Process
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How TaskMaster Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get started in minutes and transform your productivity
                </p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full">
              {[
                {
                  step: "01",
                  title: "Create Tasks",
                  description:
                    "Add tasks with descriptions, due dates, and categories. Or let AI suggest these for you.",
                },
                {
                  step: "02",
                  title: "Organize & Prioritize",
                  description: "TaskMaster helps you organize your tasks by priority, due date, or category.",
                },
                {
                  step: "03",
                  title: "Track & Complete",
                  description: "Track your progress, mark tasks as complete, and celebrate your productivity.",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%-1rem)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-slate-50 dark:bg-slate-900/50 w-full">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-screen-xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/30">
                  <Star className="mr-1 h-3 w-3" /> Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Don't just take our word for it. Here's what people are saying about TaskMaster.
                </p>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Marketing Director",
                  quote:
                    "TaskMaster has completely transformed how I manage my workload. The AI suggestions are spot on and save me so much time every day!",
                },
                {
                  name: "Michael Chen",
                  role: "Software Engineer",
                  quote:
                    "I've tried dozens of task managers, but none come close to the intuitive design and smart features of TaskMaster. It's a game-changer.",
                },
                {
                  name: "Emma Rodriguez",
                  role: "Freelance Designer",
                  quote:
                    "The calendar view and priority system help me stay on top of my busy schedule as a freelancer. I can't imagine working without it now.",
                },
                {
                  name: "David Lee",
                  role: "Project Manager",
                  quote:
                    "TaskMaster's AI suggestions save me at least an hour of planning each week. My team's productivity has increased by 30% since we started using it.",
                },
                {
                  name: "Alex Kim",
                  role: "Graduate Student",
                  quote:
                    "As someone with ADHD, TaskMaster helps me stay focused and organized in ways other apps never could. It's been life-changing for my studies.",
                },
                {
                  name: "Jennifer Patel",
                  role: "Team Lead",
                  quote:
                    "The clean interface and powerful features make TaskMaster the perfect productivity tool for our team. We've seen a significant improvement in meeting deadlines.",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="overflow-hidden bg-white dark:bg-slate-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-lg font-semibold text-purple-600">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-full">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-screen-xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Boost Your Productivity?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl opacity-90">
                  Join thousands of users who are already managing their tasks more efficiently with TaskMaster.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={AUTH_ROUTES.REGISTER}>
                  <Button size="lg" variant="secondary" className="gap-1 bg-white text-purple-600 hover:bg-gray-100">
                    Start Your Free Trial <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={AUTH_ROUTES.LOGIN}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
              </div>
              <p className="text-sm opacity-80">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background w-full">
        <div className="container mx-auto flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6 w-full max-w-screen-xl">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1.5 rounded-md">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  TaskMaster
                </span>
              </div>
              <p className="max-w-[300px] text-sm text-muted-foreground">
                AI-powered task management to help you stay organized, focused, and productive.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#features"
                      onClick={(e) => handleAnchorClick(e, "features")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      onClick={(e) => handleAnchorClick(e, "how-it-works")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      onClick={(e) => handleAnchorClick(e, "testimonials")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">© 2024 TaskMaster. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
