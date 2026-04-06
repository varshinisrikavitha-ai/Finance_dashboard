import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/format';
import { EmptyState } from '../dashboard/EmptyState';
import { motion } from 'framer-motion';
import { useFinance } from '../../context/FinanceContext';

const defaultColors = ['#22d3ee', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#64748b'];
const neonColors = ['#22d3ee', '#ec4899', '#38bdf8', '#f59e0b', '#a855f7', '#10b981', '#f43f5e'];

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

export function CategoryDonutChart({ data }) {
  const { state } = useFinance();
  const colors = state.uiLook === 'neon' ? neonColors : defaultColors;

  if (!data.length) {
    return (
      <Card>
        <EmptyState title="No spending categories yet" description="Once expense transactions are added, the category breakdown will appear here." />
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card>
        <div className="mb-6 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Spending Mix</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Category Risk Exposure</h3>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={78} outerRadius={120} paddingAngle={2} stroke="rgba(15,23,42,0.1)" strokeWidth={1}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                cursor={false}
                contentStyle={tooltipStyles.contentStyle}
                labelStyle={tooltipStyles.labelStyle}
                itemStyle={tooltipStyles.itemStyle}
              />
              <Legend verticalAlign="bottom" height={48} iconType="circle" formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}