import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';

export function InsightCard({ label, value, detail, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} whileHover={{ y: -6 }}>
      <Card className="group h-full cursor-default border-dashed border-slate-300/60 bg-gradient-to-br from-slate-50/80 via-white/80 to-slate-50/60 dark:border-slate-700/60 dark:from-slate-900/30 dark:via-slate-950/20 dark:to-slate-900/20">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
          </div>
          <p className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            </motion.div>
            <span>{detail}</span>
          </p>
        </div>
      </Card>
    </motion.div>
  );
}