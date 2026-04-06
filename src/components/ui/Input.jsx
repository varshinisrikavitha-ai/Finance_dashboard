export function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-xl border border-slate-200/80 bg-white/95 px-3.5 text-sm font-medium text-slate-900 outline-none transition-all duration-200 focus:border-sky-400/80 focus:ring-2 focus:ring-sky-400/20 placeholder:text-slate-400 dark:border-slate-700/80 dark:bg-slate-950/70 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-sky-500 ${className}`}
    />
  );
}