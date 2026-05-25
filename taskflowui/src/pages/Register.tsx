import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  ArrowRightIcon,
  ChartIcon,
  CheckIcon,
  ClipboardIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LockSmallIcon,
  MailIcon,
  UserIcon,
} from "../components/Icons"

const features = [
  { icon: CheckIcon, text: "Real-time visual tracking of your tasks" },
  { icon: ChartIcon, text: "Personalized dashboard with statistics" },
  { icon: LockIcon, text: "Secure access from anywhere" },
]

export default function Register() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await register({ username, email, password })
      navigate("/dashboard")
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { detail?: string } } }
        setError(axiosErr.response?.data?.detail || "Registration failed")
      } else {
        setError("Registration failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div
        className="relative hidden lg:flex lg:w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 to-black/75" />
        <div className="relative z-10 mx-auto max-w-md px-8 text-white animate-fade-in">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Get started
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight">
            TaskFlow
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Create your account and start organizing your projects in minutes.
          </p>
          <ul className="mt-10 space-y-4">
            {features.map((feat, i) => (
              <li
                key={feat.text}
                className="flex items-center gap-4 animate-slide-left"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <feat.icon className="text-purple-300" size={20} />
                </span>
                <span className="text-white/90">{feat.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-[var(--bg)] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm animate-slide-up">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center gap-2 text-2xl font-bold text-[var(--accent)]">
              <ClipboardIcon size={28} />
              TaskFlow
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--text-h)]">
              Create account
            </h2>
            <p className="mt-1 text-sm text-[var(--text)]">
              Start your free account
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]">
                    <UserIcon size={18} />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="your username"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]">
                    <MailIcon size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]">
                    <LockSmallIcon size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-10 text-sm text-[var(--text-h)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create account
                    <ArrowRightIcon
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--text)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--accent)] transition-colors hover:text-purple-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
