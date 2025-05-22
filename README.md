# 🚀 Task Manager - Full Stack Application

A comprehensive task management application built with modern technologies, featuring advanced task organization, filtering, and statistics dashboard.

![Task Manager](https://img.shields.io/badge/Node.js-22.x-green)
![Next.js](https://img.shields.io/badge/Next.js-15.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)

## 📋 **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Development](#development)

## ✨ **Features**

### **Core Functionality**

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete tasks
- ✅ **Task Completion Toggle** - Mark tasks as completed/pending
- ✅ **Advanced Filtering** - Filter by status, priority, category, and search
- ✅ **Real-time Statistics** - Dashboard with task completion metrics

### **Enhanced Features**

- 🎯 **Task Priorities** - High, Medium, Low with color-coded badges
- 📂 **Categories** - Work, Personal, Shopping, Health, Finance, etc.
- 📅 **Due Dates** - Date picker with overdue task highlighting
- 🔍 **Smart Search** - Search across task titles and descriptions
- 📊 **Sorting Options** - Sort by date, priority, title, or due date
- 📈 **Completion Rate** - Visual progress tracking with statistics

### **User Experience**

- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🎨 **Minimalist UI** - Clean, professional interface
- ⚡ **Real-time Updates** - Instant task updates without page refresh
- 🔄 **Loading States** - Smooth loading indicators and transitions
- 🚫 **Error Handling** - Graceful error messages and recovery

## 🛠️ **Tech Stack**

### **Frontend**

- **Framework**: Next.js 15.0 (App Router)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Custom components with Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API + useReducer
- **HTTP Client**: Fetch API with custom ApiClient class

### **Backend**

- **Runtime**: Node.js 22.x
- **Framework**: Express.js 4.19
- **Language**: TypeScript 5.6
- **Database**: MySQL 8.0 with connection pooling
- **Validation**: Joi for request validation
- **Security**: Helmet.js + CORS configuration
- **Architecture**: MVC pattern with Models, Controllers, Routes

### **Database**

- **Database**: MySQL 8.0
- **ORM**: Native MySQL2 driver
- **Containerization**: Docker Compose
- **Administration**: phpMyAdmin (optional)

### **Development Tools**

- **Package Manager**: npm
- **Process Manager**: Nodemon for development
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode

## 🏗️ **Architecture**

### **Backend Architecture (MVC Pattern)**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Routes       │────│   Controllers   │────│     Models      │
│                 │    │                 │    │                 │
│ - Task routes   │    │ - Business      │    │ - Data access   │
│ - Validation    │    │   logic         │    │ - SQL queries   │
│ - Middleware    │    │ - Error         │    │ - Data          │
│                 │    │   handling      │    │   formatting    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                         ┌───────▼───────┐
                         │    Database   │
                         │               │
                         │ - MySQL 8.0   │
                         │ - Indexed     │
                         │ - ACID        │
                         └───────────────┘
```

### **Frontend Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Pages       │────│   Components    │────│    Context      │
│                 │    │                 │    │                 │
│ - App Router    │    │ - UI Components │    │ - Task Context  │
│ - Layout        │    │ - Task Forms    │    │ - State Mgmt    │
│ - Metadata      │    │ - Lists         │    │ - API Calls     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                         ┌───────▼───────┐
                         │   API Client  │
                         │               │
                         │ - HTTP calls  │
                         │ - Error       │
                         │   handling    │
                         └───────────────┘
```

## 📚 **Prerequisites**

- **Node.js**: 22.x or higher
- **npm**: Latest version
- **Docker**: For MySQL container (recommended)
- **MySQL**: 8.0+ (if not using Docker)

## ⚡ **Installation**

### **1. Clone Repository**

```bash
git clone <repository-url>
cd task-manager
```

### **2. Database Setup (Docker - Recommended)**

```bash
# Start MySQL container
docker-compose up -d mysql

# Wait for MySQL initialization (30-60 seconds)
docker-compose logs mysql

# Optional: Access phpMyAdmin at http://localhost:8080
# Username: root, Password: rootpassword
```

### **3. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev
```

The backend will start on `http://localhost:5000`

### **4. Frontend Setup**

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local if needed

# Start development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🎯 **Usage**

### **Creating Tasks**

1. Click the "Add Task" button
2. Fill in task details:
   - **Title**: Required field
   - **Description**: Optional detailed description
   - **Priority**: High, Medium, or Low
   - **Category**: Select from predefined categories
   - **Due Date**: Optional deadline
3. Click "Create Task"

### **Managing Tasks**

- **Complete**: Click the circle checkbox to mark as completed
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon (with confirmation)

### **Filtering & Search**

- **Status Filter**: All, Pending, Completed, Overdue
- **Priority Filter**: All priorities or specific level
- **Category Filter**: Filter by task category
- **Search**: Type in the search box to find tasks
- **Sort**: Choose sorting criteria and order
- **Clear Filters**: Click X button to reset all filters

### **Statistics Dashboard**

View real-time metrics:

- Total tasks count
- Completed tasks
- Pending tasks
- Overdue tasks
- Completion rate percentage
- High priority tasks pending

## 📖 **API Documentation**

### **Base URL**

```
http://localhost:5000/api
```

### **Authentication**

No authentication required for this demo application.

### **Endpoints**

#### **GET /tasks**

Get all tasks with optional filtering.

**Query Parameters:**

- `status` (optional): `all` | `completed` | `pending` | `overdue`
- `priority` (optional): `all` | `high` | `medium` | `low`
- `category` (optional): Category name
- `search` (optional): Search term
- `sort_by` (optional): `created_at` | `due_date` | `priority` | `title`
- `sort_order` (optional): `asc` | `desc`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task description",
      "priority": "high",
      "category": "work",
      "due_date": "2024-12-31",
      "completed": false,
      "created_at": "2024-12-20T10:00:00.000Z",
      "updated_at": "2024-12-20T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### **POST /tasks**

Create a new task.

**Request Body:**

```json
{
  "title": "Task Title",
  "description": "Task description (optional)",
  "priority": "high",
  "category": "work",
  "due_date": "2024-12-31"
}
```

#### **PUT /tasks/:id**

Update an existing task.

**Request Body:** Same as POST (all fields optional)

#### **PATCH /tasks/:id/toggle**

Toggle task completion status.

#### **DELETE /tasks/:id**

Delete a task.

#### **GET /tasks/stats**

Get task statistics.

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 5,
    "pending": 5,
    "overdue": 2,
    "high_priority": 3
  }
}
```

## 🗄️ **Database Schema**

### **Tasks Table**

```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
  category VARCHAR(100) DEFAULT 'general',
  due_date DATE NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Performance indexes
  INDEX idx_priority (priority),
  INDEX idx_category (category),
  INDEX idx_completed (completed),
  INDEX idx_due_date (due_date),
  INDEX idx_created_at (created_at)
);
```

### **Sample Data**

```sql
INSERT INTO tasks (title, description, priority, category, due_date) VALUES
('Setup Development Environment', 'Install Node.js, MySQL, and configure the project', 'high', 'work', '2024-12-25'),
('Create Task Manager UI', 'Design and implement the user interface', 'medium', 'work', '2024-12-30'),
('Buy Groceries', 'Weekly grocery shopping', 'medium', 'personal', '2024-12-24');
```

## 📁 **Project Structure**

```
task-manager/
├── README.md
├── docker-compose.yml
├── init.sql
├── backend/                          # Node.js API Server
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts           # Database configuration
│   │   ├── models/
│   │   │   └── Task.ts               # Task data model
│   │   ├── controllers/
│   │   │   └── taskController.ts     # Business logic
│   │   ├── middleware/
│   │   │   ├── validation.ts         # Request validation
│   │   │   └── errorHandler.ts       # Error handling
│   │   ├── routes/
│   │   │   └── tasks.ts              # API routes
│   │   ├── types/
│   │   │   └── task.ts               # TypeScript definitions
│   │   └── server.ts                 # Express server setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── frontend/                         # Next.js React App
    ├── src/
    │   ├── app/
    │   │   ├── globals.css           # Global styles
    │   │   ├── layout.tsx            # App layout
    │   │   └── page.tsx              # Main page
    │   ├── components/
    │   │   ├── ui/
    │   │   │   └── index.tsx         # Reusable UI components
    │   │   ├── TaskForm.tsx          # Task creation/editing form
    │   │   ├── TaskItem.tsx          # Individual task component
    │   │   ├── TaskList.tsx          # Task list container
    │   │   ├── FilterBar.tsx         # Filtering controls
    │   │   └── Stats.tsx             # Statistics dashboard
    │   ├── context/
    │   │   └── TaskContext.tsx       # Global state management
    │   ├── lib/
    │   │   └── api.ts                # API client
    │   └── types/
    │       └── task.ts               # TypeScript definitions
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.js
    └── .env.local
```

## 🔧 **Development**

### **Available Scripts**

#### **Backend**

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
```

#### **Frontend**

```bash
npm run dev        # Start Next.js development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

### **Environment Variables**

#### **Backend (.env)**

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=taskuser
DB_PASSWORD=taskpassword
DB_NAME=task_manager

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### **Frontend (.env.local)**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Task Manager
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### **Code Style & Conventions**

- **TypeScript**: Strict mode enabled
- **Naming**: camelCase for variables, PascalCase for components
- **Imports**: Absolute imports using `@/` alias
- **Components**: Functional components with TypeScript interfaces
- **API**: RESTful endpoints with consistent response format

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Database Connection Failed**

```bash
# Check MySQL container status
docker-compose ps

# Restart MySQL container
docker-compose restart mysql

# Check MySQL logs
docker-compose logs mysql
```

#### **Frontend API Connection Issues**

- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is configured correctly

#### **TypeScript Compilation Errors**

```bash
# Clear Next.js cache
rm -rf .next

# Restart development server
npm run dev
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js** team for the amazing React framework
- **Express.js** for the robust Node.js framework
- **Tailwind CSS** for the utility-first CSS framework
- **MySQL** team for the reliable database system
- **TypeScript** team for bringing type safety to JavaScript

## 📞 **Contact**

For questions or support, please contact:

- **Email**: your-email@example.com
- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

---

**Built with ❤️ using modern web technologies**

_This project demonstrates full-stack development skills with Node.js, React, TypeScript, and MySQL - perfect for showcasing professional web development capabilities._
