// Small date helpers shared across pages. No external date library needed.

export function toMonthKey(dateStr) {
  // "2026-09-05" -> "2026-09"
  return dateStr.slice(0, 7)
}

export function currentMonthKey() {
  return toMonthKey(new Date().toISOString().slice(0, 10))
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function monthKeyToLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${year}`
}

export function shortMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return MONTH_NAMES[month - 1].slice(0, 3)
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function getLastNMonthKeys(n) {
  const keys = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    keys.push(key)
  }
  return keys
}

export function previousMonthKey(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  const d = new Date(year, month - 2, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// Returns true if `dateStr` (YYYY-MM-DD) falls within the named quick range.
export function isInDateRange(dateStr, range, customStart, customEnd) {
  if (range === 'all') return true
  const date = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (range === 'today') {
    return date.getTime() === startOfToday.getTime()
  }
  if (range === 'week') {
    const weekAgo = new Date(startOfToday)
    weekAgo.setDate(weekAgo.getDate() - 7)
    return date >= weekAgo && date <= now
  }
  if (range === 'month') {
    return toMonthKey(dateStr) === currentMonthKey()
  }
  if (range === 'lastMonth') {
    return toMonthKey(dateStr) === previousMonthKey(currentMonthKey())
  }
  if (range === 'custom') {
    if (!customStart || !customEnd) return true
    return dateStr >= customStart && dateStr <= customEnd
  }
  return true
}
