export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  category: string;
  due_date?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: "high" | "medium" | "low";
  category?: string;
  due_date?: string;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  completed?: boolean;
}

export interface TaskFilters {
  status?: "all" | "completed" | "pending" | "overdue";
  priority?: "all" | "high" | "medium" | "low";
  category?: string;
  search?: string;
  sort_by?: "created_at" | "due_date" | "priority" | "title";
  sort_order?: "asc" | "desc";
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  high_priority: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
