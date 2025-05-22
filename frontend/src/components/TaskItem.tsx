'use client';

import React, { useState } from 'react';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import { Check, Clock, Edit3, Trash2, AlertCircle } from 'lucide-react';
import { Task, CATEGORY_LABELS } from '@/types/task';
import { useTaskContext } from '@/context/TaskContext';
import { Button, Badge } from './ui';
import { clsx } from 'clsx';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
    const { toggleTask, deleteTask, loading } = useTaskContext();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggle = async () => {
        try {
            await toggleTask(task.id);
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            setIsDeleting(true);
            await deleteTask(task.id);
        } catch (error) {
            console.error('Failed to delete task:', error);
            setIsDeleting(false);
        }
    };

    const formatDueDate = (dateString: string) => {
        const date = parseISO(dateString);

        if (isToday(date)) return 'Today';
        if (isTomorrow(date)) return 'Tomorrow';

        return format(date, 'MMM d');
    };

    const getDueDateStatus = (dateString: string, completed: boolean) => {
        if (completed) return 'completed';

        const date = parseISO(dateString);
        if (isPast(date) && !isToday(date)) return 'overdue';
        if (isToday(date)) return 'today';
        if (isTomorrow(date)) return 'tomorrow';

        return 'upcoming';
    };

    const dueDateStatus = task.due_date ? getDueDateStatus(task.due_date, task.completed) : null;
    const isOverdue = dueDateStatus === 'overdue';

    return (
        <div
            className={clsx(
                'bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all duration-200 animate-fade-in',
                task.completed && 'opacity-75 bg-gray-50',
                isOverdue && 'border-l-4 border-red-500'
            )}
        >
            <div className="flex items-start space-x-4">
                {/* Completion Toggle */}
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={clsx(
                        'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5',
                        task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                    )}
                >
                    {task.completed && <Check className="w-3 h-3" />}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3
                                className={clsx(
                                    'text-sm font-medium text-gray-900 mb-1',
                                    task.completed && 'line-through text-gray-500'
                                )}
                            >
                                {task.title}
                            </h3>

                            {task.description && (
                                <p
                                    className={clsx(
                                        'text-sm text-gray-600 mb-2',
                                        task.completed && 'text-gray-400'
                                    )}
                                >
                                    {task.description}
                                </p>
                            )}

                            {/* Task Meta */}
                            <div className="flex items-center space-x-3 text-xs">
                                {/* Priority Badge */}
                                <Badge
                                    variant={
                                        task.priority === 'high' ? 'error' :
                                            task.priority === 'medium' ? 'warning' : 'success'
                                    }
                                >
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </Badge>

                                {/* Category */}
                                <span className="text-gray-500">
                                    {CATEGORY_LABELS[task.category as keyof typeof CATEGORY_LABELS]}
                                </span>

                                {/* Due Date */}
                                {task.due_date && (
                                    <div className="flex items-center space-x-1">
                                        {isOverdue ? (
                                            <AlertCircle className="w-3 h-3 text-red-500" />
                                        ) : (
                                            <Clock className="w-3 h-3 text-gray-400" />
                                        )}
                                        <span
                                            className={clsx(
                                                isOverdue && !task.completed ? 'text-red-600 font-medium' : 'text-gray-500'
                                            )}
                                        >
                                            {formatDueDate(task.due_date)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 ml-4">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onEdit(task)}
                                disabled={loading || isDeleting}
                                className="p-1.5"
                            >
                                <Edit3 className="w-3 h-3" />
                            </Button>

                            <Button
                                variant="error"
                                size="sm"
                                onClick={handleDelete}
                                loading={isDeleting}
                                disabled={loading}
                                className="p-1.5"
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};