export function Card({ children, className = '' }) {
  return (
    <div
      className={`ui-card rounded-2xl border border-slate-200/80 bg-white/92 p-6 shadow-[0_18px_34px_rgba(15,23,42,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300/80 hover:shadow-[0_28px_48px_rgba(14,116,144,0.15)] dark:border-slate-700/80 dark:bg-slate-900/82 dark:hover:border-cyan-500/40 ${className}`}
    >
      {children}
    </div>
  );
}