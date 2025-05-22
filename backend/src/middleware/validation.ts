import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Title is required",
    "string.max": "Title must be less than 255 characters",
  }),
  description: Joi.string().max(1000).optional().allow(""),
  priority: Joi.string().valid("high", "medium", "low").default("medium"),
  category: Joi.string().max(100).default("general"),
  // FIXED: Accept both ISO date and YYYY-MM-DD format
  due_date: Joi.alternatives()
    .try(Joi.string().isoDate(), Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/))
    .optional()
    .allow(""),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional(),
  description: Joi.string().max(1000).optional().allow(""),
  priority: Joi.string().valid("high", "medium", "low").optional(),
  category: Joi.string().max(100).optional(),
  // FIXED: Accept both ISO date and YYYY-MM-DD format
  due_date: Joi.alternatives()
    .try(Joi.string().isoDate(), Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/))
    .optional()
    .allow(""),
  completed: Joi.boolean().optional(),
});

export const taskFiltersSchema = Joi.object({
  status: Joi.string()
    .valid("all", "completed", "pending", "overdue")
    .default("all"),
  priority: Joi.string().valid("all", "high", "medium", "low").default("all"),
  category: Joi.string().optional(),
  search: Joi.string().optional(),
  sort_by: Joi.string()
    .valid("created_at", "due_date", "priority", "title")
    .default("created_at"),
  sort_order: Joi.string().valid("asc", "desc").default("desc"),
});

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      console.log("Validation error:", errors, "Original body:", req.body); // Debug log

      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
      return;
    }

    next();
  };
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      res.status(400).json({
        success: false,
        error: "Query validation failed",
        details: errors,
      });
      return;
    }

    next();
  };
};
