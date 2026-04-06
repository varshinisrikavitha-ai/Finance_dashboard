import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Activity } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/format';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { InsightCard } from '../components/dashboard/InsightCard';
import { BalanceChart } from '../components/charts/BalanceChart';
import { CategoryDonutChart } from '../components/charts/CategoryDonutChart';
import { MonthlyComparisonChart } from '../components/charts/MonthlyComparisonChart';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionsTable } from '../components/transactions/TransactionsTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { SkeletonState } from '../components/dashboard/SkeletonState';

export function DashboardPage() {
  const { state, summary, balanceTimeline, categoryBreakdown, monthlyComparison, insights } = useFinance();

  if (state.isBooting) {
    return <SkeletonState />;
  }

  return (
    <motion.div className="space-y-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <section id="hero" className="pt-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="rounded-3xl border border-slate-300/80 bg-gradient-to-br from-white via-white to-slate-50/90 p-8 shadow-[0_24px_48px_rgba(14,116,144,0.12)] backdrop-blur-sm dark:border-slate-700/60 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/50">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Zorvyn Treasury Balance</p>
                <div className="mt-3 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                  {formatCurrency(summary.balance)}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Real-time liquidity across wallets, bank rails, and operating units</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-emerald-50/80 to-white/80 px-4 py-4 shadow-sm dark:border-slate-700/40 dark:from-emerald-900/20 dark:to-slate-950/40">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Income</p>
                  <p className="mt-2 text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(summary.income)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-rose-50/80 to-white/80 px-4 py-4 shadow-sm dark:border-slate-700/40 dark:from-rose-900/20 dark:to-slate-950/40">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Expenses</p>
                  <p className="mt-2 text-lg font-extrabold text-rose-600 dark:text-rose-400">{formatCurrency(summary.expenses)}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="metrics" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">CFO Metrics</h3>
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard icon={ArrowDownLeft} label="Gross Inflow" value={formatCurrency(summary.income)} delta="All cleared incoming cash" tone="emerald" delay={0.05} />
          <SummaryCard icon={ArrowUpRight} label="Operating Spend" value={formatCurrency(summary.expenses)} delta="Controlled outflow across categories" tone="rose" delay={0.1} />
          <SummaryCard icon={Activity} label="Efficiency Rate" value={`${summary.savingsRate.toFixed(1)}%`} delta={`${summary.transactionCount} audited entries`} tone="amber" delay={0.15} />
        </div>
      </section>

      <section id="analytics" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Analytics & Insights</h3>
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <BalanceChart data={balanceTimeline} />
          <CategoryDonutChart data={categoryBreakdown} />
        </div>
      </section>

      <section id="comparison" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Monthly Breakdown</h3>
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </div>
        <MonthlyComparisonChart data={monthlyComparison} />
      </section>

      <section id="insights" className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Executive Insight Feed</h3>
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, index) => (
            <InsightCard key={insight.label} {...insight} delay={index * 0.05} />
          ))}
        </div>
      </section>

      <section id="transactions" className="space-y-5 pb-12">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Activity Stream</h3>
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </div>
        <TransactionFilters />
        <TransactionsTable />
      </section>

      <AnimatePresence>
        <TransactionModal />
      </AnimatePresence>
    </motion.div>
  );
}