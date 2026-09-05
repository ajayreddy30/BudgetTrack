import { useMemo, useState } from 'react'
import { Plus, Download } from 'lucide-react'
import TransactionFilters from '../components/TransactionFilters'
import TransactionList from '../components/TransactionList'
import Pagination from '../components/Pagination'
import { isInDateRange } from '../utils/dateUtils'
import { exportTransactionsToCSV } from '../utils/csvExport'

const PAGE_SIZE = 10

const defaultFilters = {
  search: '',
  type: 'all',
  category: 'all',
  paymentMethod: 'all',
  dateRange: 'all',
  customStart: '',
  customEnd: '',
  sort: 'newest',
}

export default function Transactions({ transactions, onEdit, onDelete, onAddClick }) {
  const [filters, setFilters] = useState(defaultFilters)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase()

    let result = transactions.filter((t) => {
      if (filters.type !== 'all' && t.type !== filters.type) return false
      if (filters.category !== 'all' && t.category !== filters.category) return false
      if (filters.paymentMethod !== 'all' && t.paymentMethod !== filters.paymentMethod) return false
      if (!isInDateRange(t.date, filters.dateRange, filters.customStart, filters.customEnd)) return false
      if (search) {
        const haystack = `${t.note} ${t.category} ${t.paymentMethod} ${t.amount} ${t.type}`.toLowerCase()
        if (!haystack.includes(search)) return false
      }
      return true
    })

    result = [...result].sort((a, b) => {
      switch (filters.sort) {
        case 'oldest': return a.date.localeCompare(b.date)
        case 'highest': return b.amount - a.amount
        case 'lowest': return a.amount - b.amount
        case 'categoryAZ': return a.category.localeCompare(b.category)
        case 'newest':
        default: return b.date.localeCompare(a.date)
      }
    })

    return result
  }, [transactions, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleFiltersChange(next) {
    setFilters(next)
    setPage(1)
  }

  return (
    <>
      <div className="topbar">
        <div>
          <h1>Transactions</h1>
          <div className="subtitle">{filtered.length} of {transactions.length} transactions</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => exportTransactionsToCSV(filtered)}>
            <Download size={15} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={onAddClick}>
            <Plus size={16} /> Add Transaction
          </button>
        </div>
      </div>

      <TransactionFilters filters={filters} onChange={handleFiltersChange} />

      <TransactionList
        transactions={pageItems}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAddClick}
        hasAnyTransactions={transactions.length > 0}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  )
}
