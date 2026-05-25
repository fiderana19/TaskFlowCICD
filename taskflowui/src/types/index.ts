export interface User {
  id: number
  username: string
  email: string
  created_at: string
}

export const TaskStatus = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

export interface Task {
  id: number
  title: string
  description: string | null
  status: TaskStatus
  due_date: string | null
  created_at: string
  updated_at: string
  user_id: number
}

export interface TaskCreatePayload {
  title: string
  description?: string | null
  status?: TaskStatus
  due_date?: string | null
}

export interface TaskUpdatePayload {
  title?: string
  description?: string | null
  status?: TaskStatus
  due_date?: string | null
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
}

export interface DashboardStats {
  total_tasks: number
  todo_tasks: number
  in_progress_tasks: number
  done_tasks: number
  completion_rate: number
  overdue_tasks: number
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
}
