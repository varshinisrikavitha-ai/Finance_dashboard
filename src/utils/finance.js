import { formatMonthLabel } from './format';

const monthKeyFromDate = (dateValue) => new Date(dateValue).toISOString().slice(0, 7);

export function normalizeTransactions(transactions) {
  return [...transactions].sort((left, right) => new Date(right.date) - new Date(left.date));
}

export function filterTransactions(transactions, filters) {
  const query = filters.query.trim().toLowerCase();

  const filtered = transactions.filter((transaction) => {
    const matchesQuery = !query || [transaction.description, transaction.category, transaction.type, String(transaction.amount)].some((value) => value.toLowerCase().includes(query));
    const matchesCategory = filters.category === 'all' || transaction.category === filters.category;
    const matchesType = filters.type === 'all' || transaction.type === filters.type;

    return matchesQuery && matchesCategory && matchesType;
  });

  return [...filtered].sort((left, right) => {
    const direction = filters.sortDirection === 'asc' ? 1 : -1;

    if (filters.sortBy === 'amount') {
      return (left.amount - right.amount) * direction;
    }

    return (new Date(left.date) - new Date(right.date)) * direction;
  });
}

export function calculateSummary(transactions, openingBalance = 0) {
  const income = transactions.filter((transaction) => transaction.type === 'income').reduce((total, transaction) => total + transaction.amount, 0);
  const expenses = transactions.filter((transaction) => transaction.type === 'expense').reduce((total, transaction) => total + transaction.amount, 0);
  const balance = openingBalance + income - expenses;

  return {
    income,
    expenses,
    balance,
    transactionCount: transactions.length,
    savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
    averageTransaction: transactions.length ? (income + expenses) / transactions.length : 0
  };
}

export function buildBalanceTimeline(transactions, openingBalance = 0) {
  const sorted = [...transactions].sort((left, right) => new Date(left.date) - new Date(right.date));
  let currentBalance = openingBalance;
  const monthEndBalance = {};

  sorted.forEach((transaction) => {
    currentBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
    const monthKey = monthKeyFromDate(transaction.date);
    monthEndBalance[monthKey] = Number(currentBalance.toFixed(2));
  });

  return Object.entries(monthEndBalance)
    .sort(([leftMonth], [rightMonth]) => leftMonth.localeCompare(rightMonth))
    .map(([month, balance]) => ({
      date: `${month}-01`,
      label: formatMonthLabel(month),
      balance
    }));
}

export function buildCategoryBreakdown(transactions) {
  const totals = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((accumulator, transaction) => {
      accumulator[transaction.category] = (accumulator[transaction.category] || 0) + transaction.amount;
      return accumulator;
    }, {});

  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value);
}

export function buildMonthlyComparison(transactions) {
  const months = transactions.reduce((accumulator, transaction) => {
    const monthKey = monthKeyFromDate(transaction.date);

    if (!accumulator[monthKey]) {
      accumulator[monthKey] = { month: monthKey, income: 0, expenses: 0 };
    }

    accumulator[monthKey][transaction.type === 'income' ? 'income' : 'expenses'] += transaction.amount;
    return accumulator;
  }, {});

  return Object.values(months)
    .sort((left, right) => left.month.localeCompare(right.month))
    .map((item) => ({
      ...item,
      label: formatMonthLabel(item.month)
    }));
}

export function buildInsights(transactions, summary, categoryBreakdown, monthlyComparison) {
  const highestCategory = categoryBreakdown[0];
  const sortedMonths = [...monthlyComparison].sort((left, right) => left.month.localeCompare(right.month));
  const recentMonth = sortedMonths.at(-1);
  const previousMonth = sortedMonths.at(-2);
  const monthlyDelta = recentMonth && previousMonth ? recentMonth.expenses - previousMonth.expenses : 0;
  const monthlyTrend = previousMonth && previousMonth.expenses > 0 ? (monthlyDelta / previousMonth.expenses) * 100 : 0;
  const topIncomeMonth = sortedMonths.reduce((best, month) => (best && best.income > month.income ? best : month), null);

  return [
    {
      label: 'Highest spending category',
      value: highestCategory ? highestCategory.name : 'No expenses yet',
      detail: highestCategory ? `Allocated ${highestCategory.value.toLocaleString('en-US')} this period.` : 'Add transactions to unlock category insights.'
    },
    {
      label: 'Monthly spend trend',
      value: monthlyTrend >= 0 ? `+${monthlyTrend.toFixed(1)}%` : `${monthlyTrend.toFixed(1)}%`,
      detail: recentMonth && previousMonth ? `Expenses in ${recentMonth.label} changed by ${Math.abs(monthlyDelta).toLocaleString('en-US')}.` : 'Not enough months for a trend comparison.'
    },
    {
      label: 'Top income month',
      value: topIncomeMonth ? topIncomeMonth.label : 'Awaiting income data',
      detail: topIncomeMonth ? `Generated ${topIncomeMonth.income.toLocaleString('en-US')} in income.` : 'Add transactions to identify income peaks.'
    },
    {
      label: 'Savings rate',
      value: `${summary.savingsRate.toFixed(1)}%`,
      detail: summary.savingsRate >= 0 ? 'You are operating with a positive savings margin.' : 'Expenses currently exceed income.'
    }
  ];
}

export function getUniqueCategories(transactions) {
  return [...new Set(transactions.map((transaction) => transaction.category))].sort((left, right) => left.localeCompare(right));
}