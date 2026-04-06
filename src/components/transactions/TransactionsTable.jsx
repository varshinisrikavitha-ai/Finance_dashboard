import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency, formatDate } from '../../utils/format';
import { EmptyState } from '../dashboard/EmptyState';
import { useFinance } from '../../context/FinanceContext';

export function TransactionsTable() {
  const { filteredTransactions, canManageTransactions, openEditor, deleteTransaction } = useFinance();

  return (
    <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/60 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Activity</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">Recent transactions</h3>
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{filteredTransactions.length} <span className="text-slate-500 dark:text-slate-500">records</span></p>
      </div>

      {filteredTransactions.length === 0 ? (
        <Card>
          <EmptyState
            title="No transactions found"
            description="Try adjusting your search terms, filters, or sort settings to find transactions."
            action={canManageTransactions ? <Button onClick={() => openEditor()}>Add transaction</Button> : null}
          />
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-800/70">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="min-w-full divide-y divide-slate-200/50 text-left dark:divide-slate-800/50">
              <thead className="bg-slate-50/90 text-xs font-semibold uppercase tracking-[0.1em] text-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                <tr>
                  <th className="px-3 py-3 text-[11px] sm:px-5 sm:py-3.5 sm:text-xs">Date</th>
                  <th className="px-3 py-3 text-[11px] sm:px-5 sm:py-3.5 sm:text-xs">Description</th>
                  <th className="px-3 py-3 text-[11px] sm:px-5 sm:py-3.5 sm:text-xs">Category</th>
                  <th className="px-3 py-3 text-[11px] sm:px-5 sm:py-3.5 sm:text-xs">Type</th>
                  <th className="px-3 py-3 text-right text-[11px] sm:px-5 sm:py-3.5 sm:text-xs">Amount</th>
                  {canManageTransactions ? <th className="px-3 py-3 text-center text-[11px] sm:px-5 sm:py-3.5 sm:text-xs">Actions</th> : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 bg-white/50 dark:divide-slate-800/50 dark:bg-slate-950/30">
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="transition-all duration-300 hover:bg-sky-50/60 dark:hover:bg-sky-950/30"
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-slate-600 dark:text-slate-300 sm:px-5 sm:py-3.5 sm:text-sm">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-3 py-3 text-xs font-medium text-slate-900 dark:text-white sm:px-5 sm:py-3.5 sm:text-sm">
                      {transaction.description}
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                      <Badge tone="neutral" className="text-xs">{transaction.category}</Badge>
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                      <Badge tone={transaction.type === 'income' ? 'success' : 'warning'} className="text-xs capitalize">
                        {transaction.type}
                      </Badge>
                    </td>
                    <td
                      className={`px-3 py-3 text-right text-xs font-bold sm:px-5 sm:py-3.5 sm:text-sm ${
                        transaction.type === 'income'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </td>
                    {canManageTransactions ? (
                      <td className="px-3 py-3 text-center sm:px-5 sm:py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            className="h-8 gap-1.5 px-3 !text-blue-600 hover:!bg-blue-100 hover:!text-blue-600 dark:!text-blue-400 dark:hover:!bg-blue-900/30 dark:hover:!text-blue-400"
                            onClick={() => openEditor(transaction)}
                            title="Edit transaction"
                          >
                            <Edit2 className="h-4 w-4" />
                            <span className="hidden text-xs font-semibold sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            className="h-8 gap-1.5 px-3 !text-red-600 hover:!bg-red-100 hover:!text-red-600 dark:!text-red-400 dark:hover:!bg-red-900/30 dark:hover:!text-red-400"
                            onClick={() => deleteTransaction(transaction.id)}
                            title="Delete transaction"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden text-xs font-semibold sm:inline">Delete</span>
                          </Button>
                        </div>
                      </td>
                    ) : null}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}