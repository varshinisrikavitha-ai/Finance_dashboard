import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, LogIn, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isHydrating, isSubmitting, login } = useAuth();

  const redirectPath = useMemo(() => location.state?.from?.pathname || '/dashboard', [location.state]);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    role: 'viewer',
    remember: true
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  if (!isHydrating && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleFieldChange(event) {
    const { name, value, checked, type } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      await login(formValues);
      setToast({ type: 'success', message: 'Welcome back. Redirecting to dashboard...' });
      window.setTimeout(() => navigate(redirectPath, { replace: true }), 450);
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Unable to login. Please try again.' });
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.2),transparent_35%),linear-gradient(180deg,#eff6ff_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.18),transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />

      <motion.div
        className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_56px_rgba(14,116,144,0.22)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-7 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure Access
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Sign in to Zorvyn Finance</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Use your account to access analytics, transactions, and treasury operations.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Email
            <Input
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleFieldChange}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <span className="text-xs font-medium text-rose-500">{errors.email}</span> : null}
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Password
            <Input
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleFieldChange}
              placeholder="Minimum 6 characters"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? <span className="text-xs font-medium text-rose-500">{errors.password}</span> : null}
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Access Role
            <select
              name="role"
              value={formValues.role}
              onChange={handleFieldChange}
              className="h-10 w-full rounded-xl border border-slate-200/80 bg-white/95 px-3.5 text-sm font-medium text-slate-900 outline-none transition-all duration-200 focus:border-sky-400/80 focus:ring-2 focus:ring-sky-400/20 dark:border-slate-700/80 dark:bg-slate-950/70 dark:text-slate-50"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </label>

          <label className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              name="remember"
              checked={formValues.remember}
              onChange={handleFieldChange}
              className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900"
            />
            Remember me
          </label>

          <Button type="submit" className="mt-2 w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          New to the platform?{' '}
          <Link className="font-bold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200" to="/signup">
            Create account
          </Link>
        </p>

        <AnimatePresence>
          {toast ? (
            <motion.div
              key={toast.message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`mt-4 rounded-xl border px-3 py-2 text-sm font-semibold ${
                toast.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300'
              }`}
            >
              {toast.message}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
