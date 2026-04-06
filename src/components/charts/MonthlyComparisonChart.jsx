import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/format';
import { EmptyState } from '../dashboard/EmptyState';
import { motion } from 'framer-motion';
import { useFinance } from '../../context/FinanceContext';

const tooltipStyles = {
  contentStyle: {
    backgroundColor: 'rgba(15, 23, 42, 0.96)',
    border: '1px solid rgba(148, 163, 184, 0.35)',
    borderRadius: '12px',
    padding: '10px 12px',
    boxShadow: '0 10px 28px rgba(2, 6, 23, 0.35)'
  },
  labelStyle: {
    color: '#e2e8f0',
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '6px'
  },
  itemStyle: {
    color: '#f8fafc',
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: 1.35
  }
};

export function MonthlyComparisonChart({ data }) {
  const { state } = useFinance();
  const incomeColor = state.uiLook === 'zorvyn' ? '#06b6d4' : '#10b981';
  const expenseColor = state.uiLook === 'zorvyn' ? '#3b82f6' : '#38bdf8';

  if (!data.length) {
    return (
      <Card>
        <EmptyState title="No monthly data yet" description="Transactions grouped by month will be shown here once data is available." />
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <Card>
        <div className="mb-6 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Monthly Comparison</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue vs Spend Velocity</h3>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={10}>
              <CartesianGrid strokeDasharray="3 6" stroke="#64748b" strokeOpacity={0.18} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickMargin={10} interval={0} minTickGap={0} />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={58} />
              <Tooltip
                formatter={(value, name) => [formatCurrency(value), name === 'income' ? 'Income' : 'Expenses']}
                cursor={false}
                contentStyle={tooltipStyles.contentStyle}
                labelStyle={tooltipStyles.labelStyle}
                itemStyle={tooltipStyles.itemStyle}
              />
              <Bar dataKey="income" radius={[12, 12, 0, 0]} fill={incomeColor} maxBarSize={34} />
              <Bar dataKey="expenses" radius={[12, 12, 0, 0]} fill={expenseColor} maxBarSize={34} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}