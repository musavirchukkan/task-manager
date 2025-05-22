import { Request, Response, NextFunction } from "express";
import { TaskModel } from "../models/Task";
import { CreateTaskDto, UpdateTaskDto, TaskFilters } from "../types/task";
import { CustomError, asyncHandler } from "../middleware/errorHandler";

export const getAllTasks = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // FIXED: Use validated query data or fallback to req.query
    const filters = ((req as any).validated?.query || req.query) as TaskFilters;
    const tasks = await TaskModel.findAll(filters);

    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  }
);

export const getTaskById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const task = await TaskModel.findById(parseInt(id));

    if (!task) {
      throw new CustomError("Task not found", 404);
    }

    res.json({
      success: true,
      data: task,
    });
  }
);

export const createTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const taskData: CreateTaskDto = req.body;
    const newTask = await TaskModel.create(taskData);

    res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  }
);

export const updateTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates: UpdateTaskDto = req.body;

    const updatedTask = await TaskModel.update(parseInt(id), updates);

    if (!updatedTask) {
      throw new CustomError("Task not found", 404);
    }

    res.json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  }
);

export const deleteTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deleted = await TaskModel.delete(parseInt(id));

    if (!deleted) {
      throw new CustomError("Task not found", 404);
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  }
);

export const toggleTaskCompletion = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedTask = await TaskModel.toggleCompletion(parseInt(id));

    if (!updatedTask) {
      throw new CustomError("Task not found", 404);
    }

    res.json({
      success: true,
      data: updatedTask,
      message: `Task marked as ${
        updatedTask.completed ? "completed" : "pending"
      }`,
    });
  }
);

export const getTaskStats = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const stats = await TaskModel.getStats();

    res.json({
      success: true,
      data: stats,
    });
  }
);
