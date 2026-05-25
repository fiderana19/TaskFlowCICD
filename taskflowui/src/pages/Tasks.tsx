import { useEffect, useState, useCallback } from "react"
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../api/tasks"
import type { Task, TaskStatus, PaginatedResponse } from "../types"
import Modal from "../components/Modal"
import TaskForm from "./TaskForm"
import { formatDate } from "../lib/utils"
import {
  EditIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "../components/Icons"

const statusColors: Record<TaskStatus, string> = {
  todo: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  in_progress:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

export default function Tasks() {
  const [data, setData] = useState<PaginatedResponse<Task> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("")
  const size = 10

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Task | null>(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const result = await listTasks({
        page,
        size,
        status: statusFilter || undefined,
        search: search || undefined,
      })
      setData(result)
    } catch {
      setError("Error loading tasks")
    } finally {
      setLoading(false)
    }
  }, [page, size, statusFilter, search])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  function openCreateModal() {
    setEditingTask(null)
    setModalOpen(true)
  }

  function openEditModal(task: Task) {
    setEditingTask(task)
    setModalOpen(true)
  }

  async function handleSubmit(formData: {
    title: string
    description: string
    status: TaskStatus
    due_date: string | null
  }) {
    if (editingTask) {
      await updateTask(editingTask.id, formData)
    } else {
      await createTask(formData)
    }
    setModalOpen(false)
    setEditingTask(null)
    fetchTasks()
  }

  async function handleStatusChange(taskId: number, newStatus: TaskStatus) {
    try {
      await updateTaskStatus(taskId, newStatus)
      fetchTasks()
    } catch {
      setError("Error updating status")
    }
  }

  async function handleDelete(taskId: number) {
    try {
      await deleteTask(taskId)
      setDeleteConfirm(null)
      fetchTasks()
    } catch {
      setError("Error deleting task")
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-h)]">Tasks</h1>
          <p className="mt-1 text-sm text-[var(--text)]">
            Manage your tasks efficiently
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="group flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:translate-y-[-1px]"
        >
          <PlusIcon size={18} />
          New Task
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]">
            <SearchIcon size={18} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] pointer-events-none">
            <FilterIcon size={18} />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as TaskStatus | "")
              setPage(1)
            }}
            className="w-48 cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
          >
            <option value="">All status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {data && !loading && (
        <>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--code-bg)]">
                  <th className="px-4 py-3.5 font-semibold text-[var(--text-h)]">
                    Title
                  </th>
                  <th className="px-4 py-3.5 font-semibold text-[var(--text-h)]">
                    Status
                  </th>
                  <th className="px-4 py-3.5 font-semibold text-[var(--text-h)]">
                    Due Date
                  </th>
                  <th className="px-4 py-3.5 font-semibold text-[var(--text-h)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-16 text-center text-[var(--text)]"
                    >
                      <p className="text-lg font-medium">No tasks found</p>
                      <p className="mt-1 text-sm">
                        Create a new task to get started
                      </p>
                    </td>
                  </tr>
                ) : (
                  data.items.map((task, idx) => (
                    <tr
                      key={task.id}
                      className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--accent-bg)]"
                      style={{
                        animation: `slide-up 0.3s ease-out ${idx * 50}ms both`,
                      }}
                    >
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-[var(--text-h)]">
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="mt-0.5 max-w-xs truncate text-xs text-[var(--text)]">
                            {task.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(
                              task.id,
                              e.target.value as TaskStatus
                            )
                          }
                          className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium outline-none transition-all focus:ring-2 focus:ring-[var(--accent-bg)] ${statusColors[task.status]}`}
                        >
                          <option value="todo">To Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-[var(--text)]">
                        {formatDate(task.due_date)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEditModal(task)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text)] transition-colors hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]"
                            title="Edit"
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(task)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text)] transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                            title="Delete"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {data.pages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex cursor-pointer items-center gap-1 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-all hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-[var(--text)]">
                Page {data.page} / {data.pages}
              </span>
              <button
                disabled={page >= data.pages}
                onClick={() => setPage((p) => p + 1)}
                className="flex cursor-pointer items-center gap-1 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-all hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingTask(null)
        }}
        title={editingTask ? "Edit task" : "New task"}
      >
        <TaskForm
          key={editingTask?.id ?? "new"}
          task={editingTask}
          onSubmit={handleSubmit}
          onClose={() => {
            setModalOpen(false)
            setEditingTask(null)
          }}
        />
      </Modal>

      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete task"
      >
        <p className="mb-6 text-sm text-[var(--text)]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[var(--text-h)]">
            {deleteConfirm?.title}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteConfirm(null)}
            className="cursor-pointer rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--accent-bg)]"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:translate-y-[-1px]"
          >
            <TrashIcon size={16} />
            Delete
          </button>
        </div>
      </Modal>
    </div>
  )
}
