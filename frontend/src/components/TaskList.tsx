'use client';

import React from 'react';
import { CheckCircle, ListTodo } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import { TaskItem } from './TaskItem';
import { Task } from '@/types/task';

interface TaskListProps {
    onEditTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
    const { tasks, loading, error, filters } = useTaskContext();

    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 animate-pulse">
                        <div className="flex items-start space-x-4">
                            <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                <div className="flex space-x-2">
                                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <div className="text-red-500 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Tasks</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <p className="text-sm text-gray-500">Please try refreshing the page.</p>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <div className="text-gray-400 mb-4">
                    {filters.search || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all' ? (
                        <ListTodo className="w-12 h-12 mx-auto" />
                    ) : (
                        <CheckCircle className="w-12 h-12 mx-auto" />
                    )}
                </div>

                {filters.search || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all' ? (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Tasks Found</h3>
                        <p className="text-gray-600 mb-4">
                            No tasks match your current filters. Try adjusting your search criteria.
                        </p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Tasks Yet</h3>
                        <p className="text-gray-600 mb-4">
                            Get started by creating your first task. Click the "Add Task" button above.
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEditTask}
                />
            ))}

            {/* Task Count */}
            <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                    Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                    {(filters.search || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all') &&
                        ' matching your filters'
                    }
                </p>
            </div>
        </div>
    );
};