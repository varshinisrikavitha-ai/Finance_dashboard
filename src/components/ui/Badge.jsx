export function Badge({ children, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'bg-slate-100/90 text-slate-700 ring-1 ring-slate-200/70 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/80',
    success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-900',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-900',
    danger: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-900',
    info: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-900'
  };

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}