'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select, Modal } from './ui';
import { CreateTaskDto, UpdateTaskDto, CATEGORIES, CATEGORY_LABELS, Task } from '@/types/task';
import { useTaskContext } from '@/context/TaskContext';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  priority: z.enum(['high', 'medium', 'low']),
  category: z.string().min(1, 'Category is required'),
  due_date: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  mode: 'create' | 'edit';
}

const priorityOptions = [
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' },
];

const categoryOptions = CATEGORIES.map(category => ({
  value: category,
  label: CATEGORY_LABELS[category],
}));

export const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  task,
  mode,
}) => {
  const { createTask, updateTask, loading } = useTaskContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      category: 'general',
      due_date: '',
    },
  });

  React.useEffect(() => {
    if (task && mode === 'edit') {
      setValue('title', task.title);
      setValue('description', task.description || '');
      setValue('priority', task.priority);
      setValue('category', task.category);
      setValue('due_date', task.due_date || '');
    } else {
      reset();
    }
  }, [task, mode, setValue, reset]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      const taskData = {
        ...data,
        description: data.description || undefined,
        due_date: data.due_date || undefined,
      };

      if (mode === 'create') {
        await createTask(taskData as CreateTaskDto);
      } else if (task) {
        await updateTask(task.id, taskData as UpdateTaskDto);
      }

      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Add New Task' : 'Edit Task'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter task title..."
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            placeholder="Enter task description (optional)..."
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            {...register('priority')}
            options={priorityOptions}
            error={errors.priority?.message}
          />

          <Select
            label="Category"
            {...register('category')}
            options={categoryOptions}
            error={errors.category?.message}
          />
        </div>

        <Input
          label="Due Date"
          type="date"
          {...register('due_date')}
          error={errors.due_date?.message}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            {mode === 'create' ? 'Create Task' : 'Update Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};