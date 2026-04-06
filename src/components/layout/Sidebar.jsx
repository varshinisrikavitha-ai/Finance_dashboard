import { BarChart3, CreditCard, Layers3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/format';
import { useFinance } from '../../context/FinanceContext';

const navItems = [
  { label: 'Overview', icon: Layers3, href: '#overview' },
  { label: 'Transactions', icon: CreditCard, href: '#transactions' },
  { label: 'Insights', icon: BarChart3, href: '#insights' }
];

export function Sidebar() {
  const { summary, state } = useFinance();

  return (
    <aside className="hidden xl:block xl:w-80 xl:shrink-0 xl:border-r xl:border-slate-200/80 dark:xl:border-slate-800/80">
      <div className="sticky top-0 flex h-screen flex-col gap-6 overflow-auto px-6 py-6">
        <div className="rounded-2xl border border-slate-300/70 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <img
              src="/company-logo.svg"
              alt="Zorvyn logo"
              className="h-12 w-12 flex-shrink-0 object-contain drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]"
            />
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">Zorvyn</h1>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Treasury Operations</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/80 dark:bg-slate-950/50">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Net treasury</p>
            <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(summary.balance)}</div>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                <span className="capitalize font-semibold text-slate-900 dark:text-white">{state.role}</span> mode active
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-transparent bg-white/60 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300/80 hover:bg-white hover:text-slate-900 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900/80 dark:hover:text-white"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.label}</span>
            </motion.a>
          ))}
        </nav>

        <div className="rounded-xl border border-cyan-300/80 bg-cyan-50/80 p-4 dark:border-cyan-900/70 dark:bg-cyan-950/30">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-600 dark:text-cyan-400" />
            <div>
              <p className="text-xs font-semibold text-cyan-900 dark:text-cyan-100">Compliance brief</p>
              <p className="mt-1 text-xs leading-relaxed text-cyan-800/80 dark:text-cyan-200/70">
                Transaction integrity checks are healthy. Liquidity ratio remains above internal threshold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}