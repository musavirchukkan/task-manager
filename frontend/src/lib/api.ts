import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilters,
  TaskStats,
  ApiResponse,
} from "@/types/task";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiClient {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  async getTasks(filters?: Partial<TaskFilters>): Promise<ApiResponse<Task[]>> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== "all") {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/tasks${queryString ? `?${queryString}` : ""}`;

    return this.makeRequest<Task[]>(endpoint);
  }

  async getTask(id: number): Promise<ApiResponse<Task>> {
    return this.makeRequest<Task>(`/tasks/${id}`);
  }

  async createTask(taskData: CreateTaskDto): Promise<ApiResponse<Task>> {
    return this.makeRequest<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(
    id: number,
    taskData: UpdateTaskDto
  ): Promise<ApiResponse<Task>> {
    return this.makeRequest<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id: number): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/tasks/${id}`, {
      method: "DELETE",
    });
  }

  async toggleTask(id: number): Promise<ApiResponse<Task>> {
    return this.makeRequest<Task>(`/tasks/${id}/toggle`, {
      method: "PATCH",
    });
  }

  async getTaskStats(): Promise<ApiResponse<TaskStats>> {
    return this.makeRequest<TaskStats>("/tasks/stats");
  }
}

export const apiClient = new ApiClient();
