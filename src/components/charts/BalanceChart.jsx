import { Card } from '../ui/Card';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Area } from 'recharts';
import { formatCurrency } from '../../utils/format';
import { EmptyState } from '../dashboard/EmptyState';
import { motion } from 'framer-motion';
import { useFinance } from '../../context/FinanceContext';

function chartTooltipFormatter(value) {
  return [formatCurrency(value), 'Balance'];
}

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

export function BalanceChart({ data }) {
  const { state } = useFinance();
  const isZorvynLook = state.uiLook === 'zorvyn';

  const strokeStart = isZorvynLook ? '#06b6d4' : '#38bdf8';
  const strokeEnd = isZorvynLook ? '#3b82f6' : '#34d399';
  const areaStart = isZorvynLook ? 'rgba(6, 182, 212, 0.28)' : 'rgba(56, 189, 248, 0.22)';
  const areaEnd = isZorvynLook ? 'rgba(59, 130, 246, 0.02)' : 'rgba(52, 211, 153, 0.02)';

  if (!data.length) {
    return (
      <Card>
        <EmptyState title="No balance history yet" description="Add transactions to start building a balance timeline and trend analysis." />
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card>
        <div className="mb-6 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Balance Trend</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Treasury Balance Progression</h3>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="balanceStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={strokeStart} />
                  <stop offset="100%" stopColor={strokeEnd} />
                </linearGradient>
                <linearGradient id="balanceArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={areaStart} />
                  <stop offset="100%" stopColor={areaEnd} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="#64748b" strokeOpacity={0.18} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickMargin={10} interval={0} minTickGap={0} />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={58} />
              <Tooltip
                formatter={chartTooltipFormatter}
                cursor={false}
                contentStyle={tooltipStyles.contentStyle}
                labelStyle={tooltipStyles.labelStyle}
                itemStyle={tooltipStyles.itemStyle}
              />
              <Area type="monotone" dataKey="balance" stroke="none" fill="url(#balanceArea)" />
              <Line type="monotone" dataKey="balance" stroke="url(#balanceStroke)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: strokeStart, stroke: '#ffffff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}