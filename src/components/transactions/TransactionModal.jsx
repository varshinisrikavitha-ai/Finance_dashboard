import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Modal } from '../ui/Modal';
import { useFinance } from '../../context/FinanceContext';

const blankTransaction = {
  id: '',
  date: new Date().toISOString().slice(0, 10),
  description: '',
  category: 'Food',
  type: 'expense',
  amount: ''
};

export function TransactionModal() {
  const { state, closeEditor, saveTransaction, canManageTransactions } = useFinance();
  const [formState, setFormState] = useState(blankTransaction);

  const isEditing = Boolean(state.editor.editingTransaction);
  const categories = useMemo(() => ['Housing', 'Food', 'Transport', 'Utilities', 'Subscriptions', 'Health', 'Travel', 'Shopping', 'Income', 'Savings'], []);

  useEffect(() => {
    if (state.editor.editingTransaction) {
      const editing = state.editor.editingTransaction;
      setFormState({ ...editing, amount: String(editing.amount) });
      return;
    }

    setFormState(blankTransaction);
  }, [state.editor.editingTransaction]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!canManageTransactions) return;

    const transaction = {
      id: formState.id || window.crypto.randomUUID(),
      date: formState.date,
      description: formState.description.trim(),
      category: formState.category,
      type: formState.type,
      amount: Number(formState.amount)
    };

    saveTransaction(transaction);
  }

  return (
    <Modal
      open={state.editor.isOpen}
      title={isEditing ? 'Edit transaction' : 'Create transaction'}
      subtitle={canManageTransactions ? 'Changes are persisted locally and reflected instantly.' : 'Viewer mode is read-only.'}
      onClose={closeEditor}
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Date
            <Input type="date" value={formState.date} onChange={(event) => setFormState({ ...formState, date: event.target.value })} required disabled={!canManageTransactions} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Amount
            <Input type="number" min="1" step="1" value={formState.amount} onChange={(event) => setFormState({ ...formState, amount: event.target.value })} placeholder="0" required disabled={!canManageTransactions} />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Description
          <Input value={formState.description} onChange={(event) => setFormState({ ...formState, description: event.target.value })} placeholder="E.g. Client payment, rent, coffee..." required disabled={!canManageTransactions} />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Category
            <Select value={formState.category} onChange={(event) => setFormState({ ...formState, category: event.target.value })} disabled={!canManageTransactions}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Type
            <Select value={formState.type} onChange={(event) => setFormState({ ...formState, type: event.target.value })} disabled={!canManageTransactions}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </label>
        </div>

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={closeEditor} className="border border-slate-200 dark:border-slate-800">Cancel</Button>
          <Button type="submit" disabled={!canManageTransactions}>{isEditing ? 'Save changes' : 'Create transaction'}</Button>
        </div>
      </form>
    </Modal>
  );
}