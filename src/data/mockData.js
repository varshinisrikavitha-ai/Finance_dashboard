export const openingBalance = 18420;

export const categories = [
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Subscriptions',
  'Health',
  'Travel',
  'Income',
  'Savings',
  'Shopping'
];

export const initialTransactions = [
  { id: 'tx-1', date: '2026-01-03', description: 'January salary', category: 'Income', type: 'income', amount: 6200 },
  { id: 'tx-2', date: '2026-01-04', description: 'Apartment rent', category: 'Housing', type: 'expense', amount: 2100 },
  { id: 'tx-3', date: '2026-01-06', description: 'Groceries and pantry restock', category: 'Food', type: 'expense', amount: 246 },
  { id: 'tx-4', date: '2026-01-09', description: 'Metro card top-up', category: 'Transport', type: 'expense', amount: 64 },
  { id: 'tx-5', date: '2026-01-12', description: 'Cloud hosting invoice', category: 'Subscriptions', type: 'expense', amount: 39 },
  { id: 'tx-6', date: '2026-01-18', description: 'Freelance design payment', category: 'Income', type: 'income', amount: 980 },
  { id: 'tx-7', date: '2026-01-21', description: 'Dentist visit', category: 'Health', type: 'expense', amount: 150 },
  { id: 'tx-8', date: '2026-01-24', description: 'January bonus payout', category: 'Income', type: 'income', amount: 540 },
  { id: 'tx-9', date: '2026-01-25', description: 'Utilities and internet', category: 'Utilities', type: 'expense', amount: 118 },
  { id: 'tx-10', date: '2026-01-27', description: 'Client dinner meeting', category: 'Food', type: 'expense', amount: 76 },
  { id: 'tx-11', date: '2026-01-29', description: 'Savings transfer', category: 'Savings', type: 'expense', amount: 900 },
  { id: 'tx-12', date: '2026-01-30', description: 'Software subscription bundle', category: 'Subscriptions', type: 'expense', amount: 44 },
  { id: 'tx-13', date: '2026-02-03', description: 'February salary', category: 'Income', type: 'income', amount: 6250 },
  { id: 'tx-14', date: '2026-02-05', description: 'Apartment rent', category: 'Housing', type: 'expense', amount: 2100 },
  { id: 'tx-15', date: '2026-02-08', description: 'Cloud hosting renewal', category: 'Subscriptions', type: 'expense', amount: 58 },
  { id: 'tx-16', date: '2026-02-12', description: 'Client site travel', category: 'Travel', type: 'expense', amount: 184 },
  { id: 'tx-17', date: '2026-02-24', description: 'Freelance consultation', category: 'Income', type: 'income', amount: 760 },

  { id: 'tx-18', date: '2026-03-03', description: 'March salary', category: 'Income', type: 'income', amount: 6350 },
  { id: 'tx-19', date: '2026-03-05', description: 'Apartment rent', category: 'Housing', type: 'expense', amount: 2100 },
  { id: 'tx-20', date: '2026-03-09', description: 'Office utilities', category: 'Utilities', type: 'expense', amount: 132 },
  { id: 'tx-21', date: '2026-03-16', description: 'Team lunch', category: 'Food', type: 'expense', amount: 92 },
  { id: 'tx-22', date: '2026-03-27', description: 'Advisory project payment', category: 'Income', type: 'income', amount: 980 },

  { id: 'tx-23', date: '2026-04-02', description: 'April salary', category: 'Income', type: 'income', amount: 6400 },
  { id: 'tx-24', date: '2026-04-03', description: 'Savings transfer', category: 'Savings', type: 'expense', amount: 1000 },
  { id: 'tx-25', date: '2026-04-06', description: 'Investor meetup dinner', category: 'Food', type: 'expense', amount: 92 },
  { id: 'tx-26', date: '2026-04-18', description: 'Travel stipend', category: 'Income', type: 'income', amount: 250 },
  { id: 'tx-27', date: '2026-04-25', description: 'Security tooling invoice', category: 'Subscriptions', type: 'expense', amount: 66 },

  { id: 'tx-28', date: '2026-05-03', description: 'May salary', category: 'Income', type: 'income', amount: 6450 },
  { id: 'tx-29', date: '2026-05-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2120 },
  { id: 'tx-30', date: '2026-05-11', description: 'Cloud backup invoice', category: 'Subscriptions', type: 'expense', amount: 84 },
  { id: 'tx-31', date: '2026-05-21', description: 'Client project payment', category: 'Income', type: 'income', amount: 920 },

  { id: 'tx-32', date: '2026-06-03', description: 'June salary', category: 'Income', type: 'income', amount: 6500 },
  { id: 'tx-33', date: '2026-06-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2120 },
  { id: 'tx-34', date: '2026-06-10', description: 'Compliance review tool', category: 'Subscriptions', type: 'expense', amount: 120 },
  { id: 'tx-35', date: '2026-06-24', description: 'Freelance consulting', category: 'Income', type: 'income', amount: 780 },

  { id: 'tx-36', date: '2026-07-03', description: 'July salary', category: 'Income', type: 'income', amount: 6525 },
  { id: 'tx-37', date: '2026-07-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2120 },
  { id: 'tx-38', date: '2026-07-12', description: 'Team offsite travel', category: 'Travel', type: 'expense', amount: 460 },
  { id: 'tx-39', date: '2026-07-28', description: 'Advisory payment', category: 'Income', type: 'income', amount: 1030 },

  { id: 'tx-40', date: '2026-08-03', description: 'August salary', category: 'Income', type: 'income', amount: 6550 },
  { id: 'tx-41', date: '2026-08-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2140 },
  { id: 'tx-42', date: '2026-08-09', description: 'Banking platform tools', category: 'Subscriptions', type: 'expense', amount: 128 },
  { id: 'tx-43', date: '2026-08-26', description: 'Partner revenue share', category: 'Income', type: 'income', amount: 880 },

  { id: 'tx-44', date: '2026-09-03', description: 'September salary', category: 'Income', type: 'income', amount: 6580 },
  { id: 'tx-45', date: '2026-09-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2140 },
  { id: 'tx-46', date: '2026-09-11', description: 'Utilities and internet', category: 'Utilities', type: 'expense', amount: 150 },
  { id: 'tx-47', date: '2026-09-29', description: 'Customer success payment', category: 'Income', type: 'income', amount: 760 },

  { id: 'tx-48', date: '2026-10-03', description: 'October salary', category: 'Income', type: 'income', amount: 6600 },
  { id: 'tx-49', date: '2026-10-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2140 },
  { id: 'tx-50', date: '2026-10-14', description: 'Security tooling invoice', category: 'Subscriptions', type: 'expense', amount: 150 },
  { id: 'tx-51', date: '2026-10-24', description: 'Investor presentation payment', category: 'Income', type: 'income', amount: 1150 },

  { id: 'tx-52', date: '2026-11-03', description: 'November salary', category: 'Income', type: 'income', amount: 6625 },
  { id: 'tx-53', date: '2026-11-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2140 },
  { id: 'tx-54', date: '2026-11-13', description: 'Savings reserve transfer', category: 'Savings', type: 'expense', amount: 1000 },
  { id: 'tx-55', date: '2026-11-27', description: 'Consulting retainer', category: 'Income', type: 'income', amount: 940 },

  { id: 'tx-56', date: '2026-12-03', description: 'December salary', category: 'Income', type: 'income', amount: 6650 },
  { id: 'tx-57', date: '2026-12-05', description: 'Office rent', category: 'Housing', type: 'expense', amount: 2160 },
  { id: 'tx-58', date: '2026-12-10', description: 'Year-end software invoices', category: 'Subscriptions', type: 'expense', amount: 220 },
  { id: 'tx-59', date: '2026-12-22', description: 'Year-end bonus', category: 'Income', type: 'income', amount: 1500 }
];