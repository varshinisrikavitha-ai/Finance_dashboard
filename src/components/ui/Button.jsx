export function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const variants = {
    primary:
      'ui-btn-primary bg-amber-500 text-slate-950 shadow-sm hover:bg-amber-400 hover:shadow-md hover:-translate-y-0.5 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 dark:hover:shadow-amber-400/30 active:scale-[0.97] active:translate-y-0',
    secondary:
      'ui-btn-secondary bg-white text-slate-800 ring-1 ring-slate-300 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700 active:scale-[0.97] active:translate-y-0',
    ghost:
      'ui-btn-ghost bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:-translate-y-0.5 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white active:scale-[0.97] active:translate-y-0',
    danger:
      'ui-btn-danger bg-rose-500 text-white shadow-sm hover:bg-rose-600 hover:shadow-md hover:-translate-y-0.5 dark:hover:shadow-rose-500/30 active:scale-[0.97] active:translate-y-0'
  };

  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}