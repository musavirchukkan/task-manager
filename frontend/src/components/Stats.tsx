'use client';

import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Target } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';

export const Stats: React.FC = () => {
    const { stats } = useTaskContext();

    if (!stats) return null;

    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    const statItems = [
        {
            label: 'Total Tasks',
            value: stats.total,
            icon: Target,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
        {
            label: 'Completed',
            value: stats.completed,
            icon: CheckCircle,
            color: 'text-green-600',
            bg: 'bg-green-50',
        },
        {
            label: 'Pending',
            value: stats.pending,
            icon: Clock,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
        },
        {
            label: 'Overdue',
            value: stats.overdue,
            icon: AlertTriangle,
            color: 'text-red-600',
            bg: 'bg-red-50',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.label} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className={`${item.bg} rounded-lg p-2`}>
                                <Icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">{item.label}</p>
                                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Completion Rate */}
            <div className="lg:col-span-4 bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Completion Rate</span>
                    <span className="text-sm font-semibold text-gray-900">{completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionRate}%` }}
                    />
                </div>
                {stats.high_priority > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                        {stats.high_priority} high priority task{stats.high_priority > 1 ? 's' : ''} pending
                    </p>
                )}
            </div>
        </div>
    );
};