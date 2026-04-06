import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useFinance } from '../../context/FinanceContext';

export function TransactionFilters() {
  const { state, setFilter, resetFilters, categories } = useFinance();
  const [query, setQuery] = useState(state.filters.query);
  const debouncedQuery = useDebouncedValue(query, 250);

  useEffect(() => {
    setQuery(state.filters.query);
  }, [state.filters.query]);

  useEffect(() => {
    setFilter('query', debouncedQuery);
  }, [debouncedQuery, setFilter]);

  return (
    <div className="grid gap-3 rounded-2xl border border-white/60 bg-gradient-to-br from-white/90 to-white/70 p-5 shadow-[0_16px_36px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-slate-800/50 dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-950/40 md:grid-cols-2 xl:grid-cols-12">
      <div className="relative xl:col-span-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search description, category, amount..." className="pl-11 transition-all duration-300" />
      </div>

      <Select className="xl:col-span-2" value={state.filters.category} onChange={(event) => setFilter('category', event.target.value)}>
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>

      <Select className="xl:col-span-2" value={state.filters.type} onChange={(event) => setFilter('type', event.target.value)}>
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Select>

      <div className="flex flex-col gap-3 sm:flex-row xl:col-span-4">
        <Select value={state.filters.sortBy} onChange={(event) => setFilter('sortBy', event.target.value)}>
          <option value="date">Sort by date</option>
          <option value="amount">Sort by amount</option>
        </Select>

        <Select value={state.filters.sortDirection} onChange={(event) => setFilter('sortDirection', event.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </Select>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200/40 pt-4 dark:border-slate-800/40 xl:col-span-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
          <SlidersHorizontal className="h-4 w-4" />
          Refine Transactions in Real Time
        </div>
        <Button variant="ghost" onClick={resetFilters} className="border border-slate-200/60 text-xs font-semibold dark:border-slate-700/60">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}