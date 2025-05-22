import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  getTaskStats,
} from "../controllers/taskController";
import {
  validateRequest,
  validateQuery,
  createTaskSchema,
  updateTaskSchema,
  taskFiltersSchema,
} from "../middleware/validation";

const router = express.Router();

// GET /api/tasks - Get all tasks with filtering
router.get("/", validateQuery(taskFiltersSchema), getAllTasks);

// GET /api/tasks/stats - Get task statistics
router.get("/stats", getTaskStats);

// GET /api/tasks/:id - Get single task
router.get("/:id", getTaskById);

// POST /api/tasks - Create new task
router.post("/", validateRequest(createTaskSchema), createTask);

// PUT /api/tasks/:id - Update task
router.put("/:id", validateRequest(updateTaskSchema), updateTask);

// PATCH /api/tasks/:id/toggle - Toggle task completion
router.patch("/:id/toggle", toggleTaskCompletion);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", deleteTask);

export default router;
