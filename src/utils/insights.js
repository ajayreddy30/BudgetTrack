// Generates plain-language observations purely from real transaction data.
// No hardcoded or fake insights are ever shown.

import {
  getCategoryBreakdown,
  getTotalExpenses,
  getTransactionsForMonth,
} from './calculations'
import { currentMonthKey, previousMonthKey } from './dateUtils'

export function generateInsights(transactions) {
  const thisMonthKey = currentMonthKey()
  const lastMonthKey = previousMonthKey(thisMonthKey)
  const thisMonth = getTransactionsForMonth(transactions, thisMonthKey)
  const lastMonth = getTransactionsForMonth(transactions, lastMonthKey)

  if (thisMonth.length === 0) {
    return []
  }

  const insights = []
  const breakdown = getCategoryBreakdown(thisMonth, 'expense')

  if (breakdown.length > 0) {
    const top = breakdown[0]
    insights.push(`${top.category} is your highest spending category this month at ₹${top.amount.toLocaleString('en-IN')}.`)
  }

  const thisExpenses = getTotalExpenses(thisMonth)
  const lastExpenses = getTotalExpenses(lastMonth)
  if (lastExpenses > 0) {
    const change = Math.round(((thisExpenses - lastExpenses) / lastExpenses) * 100)
    if (change > 0) {
      insights.push(`You spent ${change}% more this month than last month.`)
    } else if (change < 0) {
      insights.push(`You spent ${Math.abs(change)}% less this month than last month.`)
    } else {
      insights.push('Your spending this month is about the same as last month.')
    }
  }

  insights.push(`You made ${thisMonth.length} transaction${thisMonth.length === 1 ? '' : 's'} this month.`)

  const expenseTxns = thisMonth.filter((t) => t.type === 'expense')
  if (expenseTxns.length > 0) {
    const largest = expenseTxns.reduce((max, t) => (t.amount > max.amount ? t : max), expenseTxns[0])
    insights.push(`Your largest expense was ₹${largest.amount.toLocaleString('en-IN')} for ${largest.category}.`)
  }

  // Compare a specific category month-over-month if it grew notably.
  if (lastMonth.length > 0 && breakdown.length > 0) {
    const lastBreakdown = getCategoryBreakdown(lastMonth, 'expense')
    const lastTop = lastBreakdown.find((c) => c.category === breakdown[0].category)
    if (lastTop && breakdown[0].amount > lastTop.amount) {
      insights.push(`${breakdown[0].category} spending increased compared with last month.`)
    }
  }

  return insights.slice(0, 4)
}
