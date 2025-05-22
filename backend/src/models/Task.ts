import { pool } from "../config/database";
import { Task, CreateTaskDto, UpdateTaskDto, TaskFilters } from "../types/task";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class TaskModel {
  // Helper method to format date for MySQL
  private static formatDateForMySQL(
    dateString: string | undefined
  ): string | null {
    if (!dateString || dateString === "") return null;

    try {
      // If it's already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }

      // If it's ISO format, extract date part
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;

      // Convert to YYYY-MM-DD format
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Date formatting error:", error);
      return null;
    }
  }

  static async findAll(filters?: TaskFilters): Promise<Task[]> {
    let query = `
      SELECT id, title, description, priority, category, due_date, completed, 
             created_at, updated_at 
      FROM tasks 
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    // Apply filters
    if (filters?.status && filters.status !== "all") {
      if (filters.status === "completed") {
        query += " AND completed = true";
      } else if (filters.status === "pending") {
        query += " AND completed = false";
      } else if (filters.status === "overdue") {
        query += " AND completed = false AND due_date < CURDATE()";
      }
    }

    if (filters?.priority && filters.priority !== "all") {
      query += " AND priority = ?";
      queryParams.push(filters.priority);
    }

    if (filters?.category && filters.category !== "all") {
      query += " AND category = ?";
      queryParams.push(filters.category);
    }

    if (filters?.search) {
      query += " AND (title LIKE ? OR description LIKE ?)";
      const searchTerm = `%${filters.search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    // Apply sorting
    const sortBy = filters?.sort_by || "created_at";
    const sortOrder = filters?.sort_order || "desc";

    if (sortBy === "priority") {
      query += ` ORDER BY FIELD(priority, 'high', 'medium', 'low') ${
        sortOrder === "desc" ? "ASC" : "DESC"
      }`;
    } else {
      query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    }

    const [rows] = await pool.execute<RowDataPacket[]>(query, queryParams);
    return rows.map((row) => this.formatTask(row));
  }

  static async findById(id: number): Promise<Task | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.formatTask(rows[0]);
  }

  static async create(taskData: CreateTaskDto): Promise<Task> {
    const query = `
      INSERT INTO tasks (title, description, priority, category, due_date)
      VALUES (?, ?, ?, ?, ?)
    `;

    // FIXED: Format date properly for MySQL
    const values = [
      taskData.title,
      taskData.description || null,
      taskData.priority || "medium",
      taskData.category || "general",
      this.formatDateForMySQL(taskData.due_date),
    ];

    console.log("Creating task with values:", values); // Debug log

    const [result] = await pool.execute<ResultSetHeader>(query, values);

    const createdTask = await this.findById(result.insertId);
    if (!createdTask) {
      throw new Error("Failed to retrieve created task");
    }

    return createdTask;
  }

  static async update(
    id: number,
    updates: UpdateTaskDto
  ): Promise<Task | null> {
    const existingTask = await this.findById(id);
    if (!existingTask) {
      return null;
    }

    const updateFields: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields.push(`${key} = ?`);

        // FIXED: Handle date formatting for updates
        if (key === "due_date") {
          values.push(this.formatDateForMySQL(value as string));
        } else {
          values.push(value === "" ? null : value);
        }
      }
    });

    if (updateFields.length === 0) {
      return existingTask;
    }

    values.push(id);

    const query = `UPDATE tasks SET ${updateFields.join(", ")} WHERE id = ?`;
    console.log("Update query:", query, "Values:", values); // Debug log

    await pool.execute(query, values);

    return await this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }

  static async toggleCompletion(id: number): Promise<Task | null> {
    const task = await this.findById(id);
    if (!task) {
      return null;
    }

    const newStatus = !task.completed;

    await pool.execute("UPDATE tasks SET completed = ? WHERE id = ?", [
      newStatus,
      id,
    ]);

    return await this.findById(id);
  }

  static async getStats() {
    try {
      const [totalResult] = await pool.execute<RowDataPacket[]>(
        "SELECT COUNT(*) as count FROM tasks"
      );

      const [completedResult] = await pool.execute<RowDataPacket[]>(
        "SELECT COUNT(*) as count FROM tasks WHERE completed = true"
      );

      const [pendingResult] = await pool.execute<RowDataPacket[]>(
        "SELECT COUNT(*) as count FROM tasks WHERE completed = false"
      );

      const [overdueResult] = await pool.execute<RowDataPacket[]>(
        "SELECT COUNT(*) as count FROM tasks WHERE completed = false AND due_date < CURDATE()"
      );

      const [highPriorityResult] = await pool.execute<RowDataPacket[]>(
        "SELECT COUNT(*) as count FROM tasks WHERE priority = ? AND completed = false",
        ["high"]
      );

      return {
        total: totalResult[0].count,
        completed: completedResult[0].count,
        pending: pendingResult[0].count,
        overdue: overdueResult[0].count,
        high_priority: highPriorityResult[0].count,
      };
    } catch (error) {
      console.error("Error in getStats:", error);
      throw error;
    }
  }

  private static formatTask(row: any): Task {
    return {
      ...row,
      due_date: row.due_date ? row.due_date.toISOString().split("T")[0] : null,
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString(),
    };
  }
}
