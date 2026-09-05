// All derived numbers (totals, breakdowns, trends) are computed here from
// the raw transactions array, so charts and cards never hold stale totals.

import { toMonthKey, currentMonthKey, getLastNMonthKeys } from './dateUtils'

export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions)
}

export function getTransactionsForMonth(transactions, monthKey) {
  return transactions.filter((t) => toMonthKey(t.date) === monthKey)
}

export function getCurrentMonthExpenses(transactions) {
  return getTotalExpenses(getTransactionsForMonth(transactions, currentMonthKey()))
}

// [{ category: 'Food', amount: 850, percent: 34 }, ...] sorted by amount desc
export function getCategoryBreakdown(transactions, type = 'expense') {
  const filtered = transactions.filter((t) => t.type === type)
  const total = filtered.reduce((sum, t) => sum + t.amount, 0)
  const byCategory = {}
  filtered.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount
  })
  return Object.entries(byCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percent: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
}

// [{ month: '2026-04', label: 'Apr', amount: 4200 }, ...]
export function getMonthlyTrend(transactions, monthsCount = 6) {
  const monthKeys = getLastNMonthKeys(monthsCount)
  return monthKeys.map((monthKey) => {
    const monthTransactions = getTransactionsForMonth(transactions, monthKey)
    return {
      month: monthKey,
      amount: getTotalExpenses(monthTransactions),
    }
  })
}

export function getMonthSummary(transactions, monthKey) {
  const monthTransactions = getTransactionsForMonth(transactions, monthKey)
  const income = getTotalIncome(monthTransactions)
  const expenses = getTotalExpenses(monthTransactions)
  const breakdown = getCategoryBreakdown(monthTransactions, 'expense')
  const largest = monthTransactions
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0]

  return {
    income,
    expenses,
    savings: income - expenses,
    transactionCount: monthTransactions.length,
    topCategory: breakdown[0] || null,
    largestTransaction: largest || null,
  }
}
