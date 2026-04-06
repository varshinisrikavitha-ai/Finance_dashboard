import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { initialTransactions, openingBalance } from '../data/mockData';
import { buildBalanceTimeline, buildCategoryBreakdown, buildInsights, buildMonthlyComparison, calculateSummary, filterTransactions, getUniqueCategories, normalizeTransactions } from '../utils/finance';
import { loadStoredState, saveStoredState } from '../utils/storage';

const FinanceContext = createContext(null);

const storedState = loadStoredState();

const initialState = {
  role: 'viewer',
  darkMode: storedState?.darkMode ?? false,
  uiLook: 'zorvyn',
  transactions: normalizeTransactions(storedState?.transactions ?? initialTransactions),
  filters: {
    query: '',
    category: 'all',
    type: 'all',
    sortBy: 'date',
    sortDirection: 'desc'
  },
  editor: {
    isOpen: false,
    editingTransaction: null
  },
  isBooting: true
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'set-role':
      return { ...state, role: action.role };
    case 'toggle-dark-mode':
      return { ...state, darkMode: !state.darkMode };
    case 'set-ui-look':
      return { ...state, uiLook: 'zorvyn' };
    case 'set-filter':
      return { ...state, filters: { ...state.filters, [action.key]: action.value } };
    case 'reset-filters':
      return { ...state, filters: initialState.filters };
    case 'open-editor':
      return {
        ...state,
        editor: {
          isOpen: true,
          editingTransaction: action.transaction ?? null
        }
      };
    case 'close-editor':
      return {
        ...state,
        editor: {
          isOpen: false,
          editingTransaction: null
        }
      };
    case 'save-transaction': {
      const savedTransaction = action.transaction;
      const existingIndex = state.transactions.findIndex((transaction) => transaction.id === savedTransaction.id);
      const transactions = [...state.transactions];

      if (existingIndex >= 0) {
        transactions[existingIndex] = savedTransaction;
      } else {
        transactions.unshift(savedTransaction);
      }

      return {
        ...state,
        transactions: normalizeTransactions(transactions),
        editor: {
          isOpen: false,
          editingTransaction: null
        }
      };
    }
    case 'delete-transaction':
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.id)
      };
    case 'finish-booting':
      return { ...state, isBooting: false };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    const timer = window.setTimeout(() => dispatch({ type: 'finish-booting' }), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  useEffect(() => {
    document.documentElement.dataset.look = state.uiLook;
  }, [state.uiLook]);

  useEffect(() => {
    saveStoredState({
      role: state.role,
      darkMode: state.darkMode,
      uiLook: state.uiLook,
      transactions: state.transactions
    });
  }, [state.role, state.darkMode, state.uiLook, state.transactions]);

  const filteredTransactions = useMemo(() => filterTransactions(state.transactions, state.filters), [state.transactions, state.filters]);
  const summary = useMemo(() => calculateSummary(state.transactions, openingBalance), [state.transactions]);
  const balanceTimeline = useMemo(() => buildBalanceTimeline(state.transactions, openingBalance), [state.transactions]);
  const categoryBreakdown = useMemo(() => buildCategoryBreakdown(state.transactions), [state.transactions]);
  const monthlyComparison = useMemo(() => buildMonthlyComparison(state.transactions), [state.transactions]);
  const insights = useMemo(() => buildInsights(state.transactions, summary, categoryBreakdown, monthlyComparison), [state.transactions, summary, categoryBreakdown, monthlyComparison]);
  const categories = useMemo(() => getUniqueCategories(state.transactions), [state.transactions]);

  const value = {
    state,
    summary,
    filteredTransactions,
    balanceTimeline,
    categoryBreakdown,
    monthlyComparison,
    insights,
    categories,
    canManageTransactions: state.role === 'admin',
    setRole: (role) => dispatch({ type: 'set-role', role }),
    toggleDarkMode: () => dispatch({ type: 'toggle-dark-mode' }),
    setUiLook: (uiLook) => dispatch({ type: 'set-ui-look', uiLook }),
    setFilter: (key, value) => dispatch({ type: 'set-filter', key, value }),
    resetFilters: () => dispatch({ type: 'reset-filters' }),
    openEditor: (transaction = null) => dispatch({ type: 'open-editor', transaction }),
    closeEditor: () => dispatch({ type: 'close-editor' }),
    saveTransaction: (transaction) => dispatch({ type: 'save-transaction', transaction }),
    deleteTransaction: (id) => dispatch({ type: 'delete-transaction', id })
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error('useFinance must be used inside FinanceProvider');
  }

  return context;
}