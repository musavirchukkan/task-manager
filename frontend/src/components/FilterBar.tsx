'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import { Select, Button } from './ui';
import { CATEGORIES, CATEGORY_LABELS } from '@/types/task';

export const FilterBar: React.FC = () => {
    const { filters, setFilters, clearFilters } = useTaskContext();

    const statusOptions = [
        { value: 'all', label: 'All Tasks' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'overdue', label: 'Overdue' },
    ];

    const priorityOptions = [
        { value: 'all', label: 'All Priorities' },
        { value: 'high', label: 'High Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'low', label: 'Low Priority' },
    ];

    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        ...CATEGORIES.map(category => ({
            value: category,
            label: CATEGORY_LABELS[category],
        })),
    ];

    const sortOptions = [
        { value: 'created_at', label: 'Date Created' },
        { value: 'due_date', label: 'Due Date' },
        { value: 'priority', label: 'Priority' },
        { value: 'title', label: 'Title' },
    ];

    const sortOrderOptions = [
        { value: 'desc', label: 'Descending' },
        { value: 'asc', label: 'Ascending' },
    ];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ search: e.target.value });
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters({ [key]: value });
    };

    const hasActiveFilters =
        filters.status !== 'all' ||
        filters.priority !== 'all' ||
        filters.category !== 'all' ||
        filters.search !== '' ||
        filters.sort_by !== 'created_at' ||
        filters.sort_order !== 'desc';

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="block w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Select
                    options={statusOptions}
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                />

                <Select
                    options={priorityOptions}
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                />

                <Select
                    options={categoryOptions}
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                />

                <Select
                    options={sortOptions}
                    value={filters.sort_by}
                    onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                />

                <div className="flex space-x-2">
                    <Select
                        options={sortOrderOptions}
                        value={filters.sort_order}
                        onChange={(e) => handleFilterChange('sort_order', e.target.value)}
                        className="flex-1"
                    />

                    {hasActiveFilters && (
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={clearFilters}
                            className="px-3"
                            title="Clear all filters"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Filter className="w-4 h-4" />
                    <span>
                        Active filters: {' '}
                        {filters.status !== 'all' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-1">
                                {statusOptions.find(opt => opt.value === filters.status)?.label}
                            </span>
                        )}
                        {filters.priority !== 'all' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mr-1">
                                {priorityOptions.find(opt => opt.value === filters.priority)?.label}
                            </span>
                        )}
                        {filters.category !== 'all' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mr-1">
                                {categoryOptions.find(opt => opt.value === filters.category)?.label}
                            </span>
                        )}
                        {filters.search && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-1">
                                "{filters.search}"
                            </span>
                        )}
                    </span>
                </div>
            )}
        </div>
    );
};