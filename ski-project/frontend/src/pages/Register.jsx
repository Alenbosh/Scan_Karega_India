import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"

export default function Register() {
    const register = useAuthStore((s) => s.register)
    const navigate = useNavigate()

    const [form, setForm] = useState({ full_name: "", email: "", password: "" })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        if (form.password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }
        setLoading(true)
        try {
            await register(form)
            navigate("/dashboard")
        } catch (err) {
            setError(err?.detail || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <div className="w-full max-w-sm">

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-brand-500">SKI</h1>
                    <p className="text-sm text-gray-500 mt-1">Scan Karega India</p>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        Create your account
                    </h2>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full name
                            </label>
                            <input
                                name="full_name"
                                type="text"
                                required
                                value={form.full_name}
                                onChange={onChange}
                                placeholder="Rahul Sharma"
                                className="mt-1 w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={onChange}
                                placeholder="you@example.com"
                                className="mt-1 w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={onChange}
                                placeholder="Min. 8 characters"
                                className="mt-1 w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950 px-3 py-2 rounded-lg">
                                {error}
                            </p>
                        )}

                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? "Creating account…" : "Create account"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-brand-500 font-medium hover:underline">
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    )
}
