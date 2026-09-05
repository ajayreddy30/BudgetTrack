import { Search } from 'lucide-react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from '../data/categories'

const ALL_CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])]

export default function TransactionFilters({ filters, onChange }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value })
  }

  function clearAll() {
    onChange({
      search: '',
      type: 'all',
      category: 'all',
      paymentMethod: 'all',
      dateRange: 'all',
      customStart: '',
      customEnd: '',
      sort: 'newest',
    })
  }

  return (
    <div className="filters-bar">
      <div className="search-input" style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search note, category, amount..."
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          style={{ paddingLeft: 30, width: '100%' }}
          aria-label="Search transactions"
        />
      </div>

      <select value={filters.type} onChange={(e) => update('type', e.target.value)} aria-label="Filter by type">
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={filters.category} onChange={(e) => update('category', e.target.value)} aria-label="Filter by category">
        <option value="all">All categories</option>
        {ALL_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select value={filters.paymentMethod} onChange={(e) => update('paymentMethod', e.target.value)} aria-label="Filter by payment method">
        <option value="all">All payment methods</option>
        {PAYMENT_METHODS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select value={filters.dateRange} onChange={(e) => update('dateRange', e.target.value)} aria-label="Filter by date range">
        <option value="all">All time</option>
        <option value="today">Today</option>
        <option value="week">This week</option>
        <option value="month">This month</option>
        <option value="lastMonth">Last month</option>
        <option value="custom">Custom range</option>
      </select>

      {filters.dateRange === 'custom' && (
        <>
          <input
            type="date"
            value={filters.customStart}
            onChange={(e) => update('customStart', e.target.value)}
            aria-label="Start date"
          />
          <input
            type="date"
            value={filters.customEnd}
            onChange={(e) => update('customEnd', e.target.value)}
            aria-label="End date"
          />
        </>
      )}

      <select value={filters.sort} onChange={(e) => update('sort', e.target.value)} aria-label="Sort transactions">
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="highest">Highest amount</option>
        <option value="lowest">Lowest amount</option>
        <option value="categoryAZ">Category A–Z</option>
      </select>

      <button className="btn btn-ghost" onClick={clearAll}>Clear Filters</button>
    </div>
  )
}
