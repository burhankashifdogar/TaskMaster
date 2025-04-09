# TaskMaster - Smart Task Manager

![TaskMaster Logo](public/icons/icon-192x192.png)

TaskMaster is an AI-powered task management application that helps you organize, prioritize, and complete your tasks more efficiently. With smart suggestions and intuitive design, TaskMaster makes task management simple and effective.

## ✨ Features

- **AI-Powered Suggestions**: Get smart recommendations for task categorization, priority, and due dates
- **Intuitive Dashboard**: View your tasks at a glance with a clean, organized dashboard
- **Task Categories**: Organize tasks by work, personal, development, health, and finance
- **Priority Levels**: Assign low, medium, high, or urgent priority to tasks
- **Calendar View**: Visualize your tasks in a calendar format
- **Analytics**: Track your productivity with detailed analytics and insights
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **PWA Support**: Install as a Progressive Web App for offline access

## 🚀 Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components
- **React Hook Form**: Form validation
- **date-fns**: Date utility library
- **Lucide React**: Icon library
- **Local Storage**: For data persistence (can be replaced with a backend)

## 📋 Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/taskmaster.git
   cd taskmaster
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

\`\`\`
taskmaster/
├── app/ # Next.js app directory
│ ├── (app)/ # App routes (dashboard, today, calendar, etc.)
│ ├── (auth)/ # Authentication routes (login, register)
│ ├── (marketing)/ # Marketing pages (landing page)
│ ├── globals.css # Global styles
│ └── layout.tsx # Root layout
├── components/ # React components
│ ├── ui/ # UI components (shadcn/ui)
│ ├── dashboard.tsx # Dashboard component
│ ├── task-item.tsx # Task item component
│ └── ... # Other components
├── hooks/ # Custom React hooks
│ ├── use-tasks.tsx # Tasks context and hook
│ └── use-mobile.tsx # Mobile detection hook
├── lib/ # Utility functions
│ ├── ai-service.ts # AI suggestion service
│ ├── routes.ts # Route definitions
│ └── utils.ts # Utility functions
├── public/ # Static assets
│ ├── icons/ # App icons
│ └── images/ # Images
└── types/ # TypeScript type definitions
\`\`\`

## 📱 Features Overview

### Dashboard

The dashboard provides an overview of your tasks, including:

- Today's tasks
- Completion rate
- Overdue tasks
- Pending, upcoming, and completed tasks

### Task Management

- Create, edit, and delete tasks
- Mark tasks as complete
- Set due dates, categories, and priority levels
- Get AI suggestions for task categorization

### Calendar View

- View tasks in a calendar format
- See tasks for specific dates
- Plan your schedule visually

### Analytics

- Track your productivity
- View completion rates
- Analyze task distribution by category and priority

### Categories

- Organize tasks by category
- Filter tasks by work, personal, development, health, and finance

## 🔒 Authentication

TaskMaster includes a simulated authentication system for demo purposes. In a production environment, you would replace this with a real authentication system.

Demo credentials:

- Email: demo@example.com
- Password: password

## 🌐 Progressive Web App

TaskMaster is configured as a Progressive Web App (PWA), which means you can install it on your device and use it offline. To install:

1. Open the application in a supported browser (Chrome, Edge, etc.)
2. Look for the install prompt in the address bar or menu
3. Follow the instructions to install

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📸 Screenshots

### Dashboard

![Dashboard](public/screenshots/dashboard.png)

### Calendar View

![Calendar](public/screenshots/calendar.png)

### Analytics

![Analytics](public/screenshots/analytics.png)

### Task Creation with AI Suggestions

![Task Creation](public/screenshots/task-creation.png)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [date-fns](https://date-fns.org/)

---

Built with ❤️ by BurhanKashif
