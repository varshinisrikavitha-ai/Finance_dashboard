import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';

export function EmptyState({ title, description, action }) {
  return (
    <Card className="flex min-h-[280px] items-center justify-center text-center">
      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 text-sky-500"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>
        <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
        {action ? (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {action}
          </motion.div>
        ) : null}
      </motion.div>
    </Card>
  );
}