import { useState } from "react"
import type { Task, TaskStatus } from "../types"
import { UserIcon } from "../components/Icons"

const DEFAULT_STATUS: TaskStatus = "todo"

interface TaskFormProps {
  task?: Task | null
  onSubmit: (data: {
    title: string
    description: string
    status: TaskStatus
    due_date: string | null
  }) => Promise<void>
  onClose: () => void
}

export default function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "")
  const [description, setDescription] = useState(task?.description ?? "")
  const [status, setStatus] = useState<TaskStatus>(
    task?.status ?? DEFAULT_STATUS
  )
  const [dueDate, setDueDate] = useState(
    task?.due_date ? task.due_date.slice(0, 16) : ""
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError("Title is required")
      return
    }
    setError("")
    setLoading(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || "",
        status,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      })
    } catch {
      setError("Error saving task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
          Title
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]">
            <UserIcon size={18} />
          </span>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
          Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
          Due date
        </label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:hover:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </span>
          ) : task ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </div>
    </form>
  )
}
