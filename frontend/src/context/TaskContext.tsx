'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto, TaskFilters, TaskStats } from '@/types/task';
import { apiClient } from '@/lib/api';

interface TaskState {
    tasks: Task[];
    stats: TaskStats | null;
    filters: TaskFilters;
    loading: boolean;
    error: string | null;
}

type TaskAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'SET_STATS'; payload: TaskStats }
    | { type: 'SET_FILTERS'; payload: Partial<TaskFilters> }
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'TOGGLE_TASK'; payload: Task };

const initialState: TaskState = {
    tasks: [],
    stats: null,
    filters: {
        status: 'all',
        priority: 'all',
        category: 'all',
        search: '',
        sort_by: 'created_at',
        sort_order: 'desc',
    },
    loading: false,
    error: null,
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };

        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };

        case 'SET_TASKS':
            return { ...state, tasks: action.payload, loading: false, error: null };

        case 'SET_STATS':
            return { ...state, stats: action.payload };

        case 'SET_FILTERS':
            return { ...state, filters: { ...state.filters, ...action.payload } };

        case 'ADD_TASK':
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false,
                error: null
            };

        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
                loading: false,
                error: null,
            };

        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                loading: false,
                error: null,
            };

        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

interface TaskContextType extends TaskState {
    fetchTasks: () => Promise<void>;
    fetchStats: () => Promise<void>;
    createTask: (taskData: CreateTaskDto) => Promise<void>;
    updateTask: (id: number, taskData: UpdateTaskDto) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    toggleTask: (id: number) => Promise<void>;
    setFilters: (filters: Partial<TaskFilters>) => void;
    clearFilters: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const fetchTasks = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await apiClient.getTasks(state.filters);
            dispatch({ type: 'SET_TASKS', payload: response.data || [] });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to fetch tasks' });
        }
    };

    const fetchStats = async () => {
        try {
            const response = await apiClient.getTaskStats();
            dispatch({ type: 'SET_STATS', payload: response.data! });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const createTask = async (taskData: CreateTaskDto) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await apiClient.createTask(taskData);
            dispatch({ type: 'ADD_TASK', payload: response.data! });
            await fetchStats();
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to create task' });
            throw error;
        }
    };

    const updateTask = async (id: number, taskData: UpdateTaskDto) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await apiClient.updateTask(id, taskData);
            dispatch({ type: 'UPDATE_TASK', payload: response.data! });
            await fetchStats();
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update task' });
            throw error;
        }
    };

    const deleteTask = async (id: number) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            await apiClient.deleteTask(id);
            dispatch({ type: 'DELETE_TASK', payload: id });
            await fetchStats();
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to delete task' });
            throw error;
        }
    };

    const toggleTask = async (id: number) => {
        try {
            const response = await apiClient.toggleTask(id);
            dispatch({ type: 'TOGGLE_TASK', payload: response.data! });
            await fetchStats();
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to toggle task' });
            throw error;
        }
    };

    const setFilters = (filters: Partial<TaskFilters>) => {
        dispatch({ type: 'SET_FILTERS', payload: filters });
    };

    const clearFilters = () => {
        dispatch({ type: 'SET_FILTERS', payload: initialState.filters });
    };

    useEffect(() => {
        fetchTasks();
    }, [state.filters]);

    useEffect(() => {
        fetchStats();
    }, []);

    const value: TaskContextType = {
        ...state,
        fetchTasks,
        fetchStats,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
        setFilters,
        clearFilters,
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};