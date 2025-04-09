type AISuggestions = {
  category?: string
  priority?: string
  dueDate?: Date
}

export async function getAISuggestions(taskTitle: string): Promise<AISuggestions> {
  try {
    // In a real app, this would use the OpenAI API with your API key
    // For demo purposes, we'll simulate the AI response

    // This is how you would implement it with the AI SDK:
    /*
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Based on this task title: "${taskTitle}", suggest:
        1. A category (work, personal, dev, health, finance)
        2. A priority level (low, medium, high, urgent)
        3. A reasonable due date (in ISO format)
        
        Format your response as JSON:
        {
          "category": "category_name",
          "priority": "priority_level",
          "dueDate": "YYYY-MM-DD"
        }
      `,
    });
    
    return JSON.parse(text);
    */

    // Simulated AI response for demo
    return simulateAIResponse(taskTitle)
  } catch (error) {
    console.error("Error getting AI suggestions:", error)
    throw new Error("Failed to get AI suggestions")
  }
}

// Simulate AI response based on keywords in the task title
function simulateAIResponse(taskTitle: string): AISuggestions {
  const title = taskTitle.toLowerCase()
  let category = "personal"
  let priority = "medium"
  let daysToAdd = 3 // Default due date is 3 days from now

  // Determine category based on keywords
  if (title.includes("bug") || title.includes("code") || title.includes("fix") || title.includes("develop")) {
    category = "dev"
  } else if (
    title.includes("meeting") ||
    title.includes("client") ||
    title.includes("project") ||
    title.includes ||
    title.includes("client") ||
    title.includes("project") ||
    title.includes("report") ||
    title.includes("deadline")
  ) {
    category = "work"
  } else if (
    title.includes("doctor") ||
    title.includes("gym") ||
    title.includes("workout") ||
    title.includes("exercise")
  ) {
    category = "health"
  } else if (title.includes("bill") || title.includes("pay") || title.includes("budget") || title.includes("money")) {
    category = "finance"
  }

  // Determine priority based on keywords
  if (
    title.includes("urgent") ||
    title.includes("asap") ||
    title.includes("immediately") ||
    title.includes("critical")
  ) {
    priority = "urgent"
  } else if (title.includes("important") || title.includes("high") || title.includes("priority")) {
    priority = "high"
  } else if (title.includes("low") || title.includes("whenever") || title.includes("eventually")) {
    priority = "low"
  }

  // Determine due date based on keywords
  if (title.includes("today")) {
    daysToAdd = 0
  } else if (title.includes("tomorrow")) {
    daysToAdd = 1
  } else if (title.includes("week")) {
    daysToAdd = 7
  } else if (title.includes("month")) {
    daysToAdd = 30
  }

  // Calculate due date
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + daysToAdd)

  return {
    category,
    priority,
    dueDate,
  }
}
