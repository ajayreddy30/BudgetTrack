// Every direct localStorage read/write for the app lives here.
// Components never touch window.localStorage themselves.

const KEYS = {
  TRANSACTIONS: 'budgettrack_transactions',
  BUDGET: 'budgettrack_budget',
  THEME: 'budgettrack_theme',
}

function safeGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (err) {
    console.error(`BudgetTrack: could not read "${key}" from storage`, err)
    return fallback
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.error(`BudgetTrack: could not save "${key}" to storage`, err)
    return false
  }
}

export function getTransactions() {
  return safeGet(KEYS.TRANSACTIONS, null)
}

export function saveTransactions(transactions) {
  return safeSet(KEYS.TRANSACTIONS, transactions)
}

export function getBudget() {
  return safeGet(KEYS.BUDGET, 20000)
}

export function saveBudget(amount) {
  return safeSet(KEYS.BUDGET, amount)
}

export function getTheme() {
  return safeGet(KEYS.THEME, 'light')
}

export function saveTheme(theme) {
  return safeSet(KEYS.THEME, theme)
}

export function clearAllData() {
  try {
    window.localStorage.removeItem(KEYS.TRANSACTIONS)
    window.localStorage.removeItem(KEYS.BUDGET)
    return true
  } catch (err) {
    console.error('BudgetTrack: could not clear storage', err)
    return false
  }
}
