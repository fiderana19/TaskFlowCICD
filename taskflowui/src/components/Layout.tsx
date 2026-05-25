import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  ChartIcon,
  ClipboardIcon,
  ListIcon,
  LogoutIcon,
} from "./Icons"

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: ChartIcon },
  { path: "/tasks", label: "Tasks", icon: ListIcon },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen">
      <aside className="fixed flex h-screen w-64 flex-col bg-gradient-to-b from-[#1a1025] to-[#0d0a14]">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-6 pt-6 pb-8"
        >
          <ClipboardIcon className="text-purple-400" size={28} />
          <span className="text-xl font-bold text-white">TaskFlow</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "border-l-2 border-purple-400 bg-white/10 text-white"
                    : "text-purple-200/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/30 text-sm font-semibold text-purple-300">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.username}
              </p>
              <p className="truncate text-xs text-purple-300/60">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-white/5 hover:text-red-200"
          >
            <LogoutIcon size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="ml-64 flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-72 rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2 pl-9 pr-4 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative cursor-pointer rounded-xl p-2 text-[var(--text)] transition-colors hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                2
              </span>
            </button>
            <span className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[var(--accent-bg)] text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[var(--bg)] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
