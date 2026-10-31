import { useState, useId } from 'react'
import { Link } from 'react-router-dom'

function InputField({ label, error, ...inputProps }) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // TODO: replace with your API call
      console.log('Log in:', form)
    } catch {
      setError('Could not log in. Check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Welcome back</h1>
            <p className="auth-subtitle">Enter your credentials to access your account.</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <InputField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Logging in…
                </span>
              ) : (
                'Log in'
              )}
            </button>
          </form>
          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

