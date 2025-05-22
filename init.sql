-- Initialize Task Manager Database
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
  category VARCHAR(100) DEFAULT 'general',
  due_date DATE NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes for performance
  INDEX idx_priority (priority),
  INDEX idx_category (category),
  INDEX idx_completed (completed),
  INDEX idx_due_date (due_date),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO tasks (title, description, priority, category, due_date) VALUES
('Setup Development Environment', 'Install Node.js, MySQL, and configure the project', 'high', 'work', '2024-12-25'),
('Create Task Manager UI', 'Design and implement the user interface', 'medium', 'work', '2024-12-30'),
('Write Documentation', 'Create comprehensive project documentation', 'low', 'work', '2025-01-05'),
('Buy Groceries', 'Weekly grocery shopping', 'medium', 'personal', '2024-12-24'),
('Exercise', 'Go to the gym or workout at home', 'high', 'health', '2024-12-23');