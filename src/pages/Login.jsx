
import { useState } from 'react'
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'
import { users } from '../data/users.js'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = event => {
    event.preventDefault()
    setError('')

    const matchedUser = users.find(
      user =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    )

    if (!matchedUser) {
      setError('Invalid email or password. Please try again.')
      return
    }

    const { password: userPassword, ...safeUser } = matchedUser

    login(safeUser)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-lg">

        <div className="flex flex-col items-center mb-8">

          <div className="bg-purple-600 text-white p-4 rounded-2xl">
            <GraduationCap size={35} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-4">
            Joineazy
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to your account
          </p>

        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full border border-slate-200 rounded-xl p-3 pl-11 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full border border-slate-200 rounded-xl p-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(previous => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Joineazy Assignment Management Portal
        </p>

      </div>

    </div>
  )
}

export default Login
