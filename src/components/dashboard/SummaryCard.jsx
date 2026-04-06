import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export function SummaryCard({ icon: Icon, label, value, delta, tone = 'sky', delay = 0 }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (i || delay) * 0.15,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  const colorMap = {
    sky: {
      bg: 'from-slate-100/90 to-slate-50 dark:from-slate-800/60 dark:to-slate-900',
      icon: 'bg-slate-900 text-white dark:bg-slate-700',
      text: 'text-slate-600 dark:text-slate-300'
    },
    emerald: {
      bg: 'from-emerald-50 to-slate-50 dark:from-emerald-900/30 dark:to-slate-900',
      icon: 'bg-emerald-600 text-white dark:bg-emerald-500',
      text: 'text-emerald-700 dark:text-emerald-300'
    },
    rose: {
      bg: 'from-rose-50 to-slate-50 dark:from-rose-900/30 dark:to-slate-900',
      icon: 'bg-rose-600 text-white dark:bg-rose-500',
      text: 'text-rose-700 dark:text-rose-300'
    },
    amber: {
      bg: 'from-amber-50 to-slate-50 dark:from-amber-900/30 dark:to-slate-900',
      icon: 'bg-amber-500 text-slate-900 dark:bg-amber-400 dark:text-slate-950',
      text: 'text-amber-700 dark:text-amber-300'
    }
  };

  const colors = colorMap[tone];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={delay}
      variants={containerVariants}
    >
      <Card className={`relative overflow-hidden bg-gradient-to-br ${colors.bg} hover:scale-[1.02]`}>
        <div className="relative space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${colors.text}`}>{label}</p>
              <div className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</div>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.icon} shadow-sm`}>
              <Icon className="h-4 w-4" />
            </div>
          </div>
          {delta ? <p className="text-sm text-slate-600/90 dark:text-slate-300">{delta}</p> : null}
        </div>
      </Card>
    </motion.div>
  );
}