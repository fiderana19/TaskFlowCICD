import client from "./client"
import type {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
  TaskStatus,
  PaginatedResponse,
} from "../types"

export interface ListTasksParams {
  page?: number
  size?: number
  status?: TaskStatus
  search?: string
}

export async function listTasks(
  params: ListTasksParams = {}
): Promise<PaginatedResponse<Task>> {
  const { data } = await client.get("/tasks", { params })
  return data
}

export async function getTask(id: number): Promise<Task> {
  const { data } = await client.get(`/tasks/${id}`)
  return data
}

export async function createTask(payload: TaskCreatePayload): Promise<Task> {
  const { data } = await client.post("/tasks", payload)
  return data
}

export async function updateTask(
  id: number,
  payload: TaskUpdatePayload
): Promise<Task> {
  const { data } = await client.put(`/tasks/${id}`, payload)
  return data
}

export async function deleteTask(id: number): Promise<void> {
  await client.delete(`/tasks/${id}`)
}

export async function updateTaskStatus(
  id: number,
  status: TaskStatus
): Promise<Task> {
  const { data } = await client.patch(`/tasks/${id}/status`, { status })
  return data
}
