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

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const next = {}
    if (form.password.length < 8)
      next.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password)
      next.confirm = 'Passwords do not match.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    setLoading(true)
    try {
      console.log('Sign up:', form)
    } catch {
      setErrors({ form: 'Could not create your account. Try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Create your account</h1>
            <p className="auth-subtitle">It takes less than a minute.</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <InputField
              label="Full name"
              name="name"
              autoComplete="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
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
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            <InputField
              label="Confirm password"
              type="password"
              name="confirm"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              error={errors.confirm}
              required
            />
            {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Creating account…
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
