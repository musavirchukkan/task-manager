'use client';

import React, { useState } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import { TaskProvider } from '@/context/TaskContext';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { Stats } from '@/components/Stats';
import { Button } from '@/components/ui';
import { Task } from '@/types/task';

function TaskManagerContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 rounded-lg p-2">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                <p className="text-gray-600">Organize your tasks efficiently</p>
              </div>
            </div>

            <Button onClick={handleAddTask} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <Stats />

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar />
        </div>

        {/* Task List */}
        <div className="mb-8">
          <TaskList onEditTask={handleEditTask} />
        </div>

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          task={editingTask}
          mode={editingTask ? 'edit' : 'create'}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js 15, TypeScript, and Tailwind CSS 4</p>
            <p className="mt-1">Full-stack Task Manager with MySQL backend</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function TaskManagerPage() {
  return (
    <TaskProvider>
      <TaskManagerContent />
    </TaskProvider>
  );
}