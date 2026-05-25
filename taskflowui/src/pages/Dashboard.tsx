import { useEffect, useState } from "react"
import { getStats } from "../api/dashboard"
import { AlertIcon, ChartIcon, CheckIcon, ClockIcon, ListIcon } from "../components/Icons"
import type { DashboardStats } from "../types"

interface StatCard {
  label: string
  value: number
  icon: typeof ChartIcon
  color: string
  bg: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setError("Error loading statistics"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
        {error}
      </div>
    )
  }

  if (!stats) return null

  const cards: StatCard[] = [
    {
      label: "Total",
      value: stats.total_tasks,
      icon: ListIcon,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      label: "To Do",
      value: stats.todo_tasks,
      icon: ClockIcon,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-950/50",
    },
    {
      label: "In Progress",
      value: stats.in_progress_tasks,
      icon: ChartIcon,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      label: "Done",
      value: stats.done_tasks,
      icon: CheckIcon,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/50",
    },
  ]

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-h)]">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--text)]">
          Here&apos;s your task summary
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.color}`}
              >
                <Icon size={22} />
              </div>
              <p className="text-3xl font-bold text-[var(--text-h)]">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-[var(--text)]">{card.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            <ChartIcon size={22} />
          </div>
          <p className="mb-1 text-sm text-[var(--text)]">Completion Rate</p>
          <p className="mb-3 text-3xl font-bold text-[var(--accent)]">
            {stats.completion_rate}%
          </p>
          <div className="h-2 rounded-full bg-[var(--border)]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
              style={{ width: `${Math.min(stats.completion_rate, 100)}%` }}
            />
          </div>
        </div>

        <div
          className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${
            stats.overdue_tasks > 0
              ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
              : "border-[var(--border)] bg-[var(--bg)]"
          }`}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
            <AlertIcon size={22} />
          </div>
          <p className="mb-1 text-sm text-[var(--text)]">Overdue Tasks</p>
          <p
            className={`text-3xl font-bold ${
              stats.overdue_tasks > 0 ? "text-red-500" : "text-[var(--text-h)]"
            }`}
          >
            {stats.overdue_tasks}
          </p>
          {stats.overdue_tasks > 0 && (
            <p className="mt-2 text-xs text-red-500">
              Needs your attention
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
