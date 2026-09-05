// Central lists so every form, filter and chart stays in sync.

export const EXPENSE_CATEGORIES = [
  'Food',
  'Shopping',
  'Transport',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Travel',
  'Other',
]

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Gift',
  'Other',
]

export const PAYMENT_METHODS = [
  'Cash',
  'UPI',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Other',
]

export function categoriesForType(type) {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}

// A small set of realistic sample transactions shown only on first visit,
// so the dashboard and charts are never empty for a brand new user.
export function buildSampleTransactions() {
  const today = new Date()
  const iso = (daysAgo) => {
    const d = new Date(today)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString().slice(0, 10)
  }
  return [
    { id: 'sample-1', type: 'income', amount: 45000, category: 'Salary', date: iso(20), note: 'Monthly salary', paymentMethod: 'Bank Transfer', sample: true },
    { id: 'sample-2', type: 'expense', amount: 1800, category: 'Bills', date: iso(18), note: 'Electricity bill', paymentMethod: 'UPI', sample: true },
    { id: 'sample-3', type: 'expense', amount: 350, category: 'Food', date: iso(15), note: 'Groceries', paymentMethod: 'UPI', sample: true },
    { id: 'sample-4', type: 'expense', amount: 120, category: 'Transport', date: iso(14), note: 'Auto fare', paymentMethod: 'Cash', sample: true },
    { id: 'sample-5', type: 'expense', amount: 1500, category: 'Shopping', date: iso(10), note: 'New shoes', paymentMethod: 'Credit Card', sample: true },
    { id: 'sample-6', type: 'expense', amount: 499, category: 'Entertainment', date: iso(7), note: 'Streaming subscription', paymentMethod: 'UPI', sample: true },
    { id: 'sample-7', type: 'expense', amount: 850, category: 'Food', date: iso(3), note: 'Dinner out', paymentMethod: 'UPI', sample: true },
    { id: 'sample-8', type: 'income', amount: 6000, category: 'Freelance', date: iso(2), note: 'Logo design project', paymentMethod: 'Bank Transfer', sample: true },
  ]
}
