import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import TransactionForm from './components/TransactionForm'
import ConfirmDialog from './components/ConfirmDialog'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import { Plus } from 'lucide-react'
import {
  getTransactions,
  saveTransactions,
  getBudget,
  saveBudget,
  getTheme,
  saveTheme,
  clearAllData,
} from './utils/storage'
import { buildSampleTransactions } from './data/categories'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [transactions, setTransactions] = useState(() => {
    const stored = getTransactions()
    if (stored) return stored
    // First visit: seed with sample data so the dashboard isn't empty.
    const sample = buildSampleTransactions()
    saveTransactions(sample)
    return sample
  })
  const [budget, setBudget] = useState(() => getBudget())
  const [theme, setTheme] = useState(() => getTheme())

  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  // Persist whenever the underlying data changes.
  useEffect(() => { saveTransactions(transactions) }, [transactions])
  useEffect(() => { saveBudget(budget) }, [budget])
  useEffect(() => {
    saveTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function openAddForm() {
    setEditingTransaction(null)
    setShowForm(true)
  }

  function openEditForm(transaction) {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  function handleSaveTransaction(transaction) {
    setTransactions((prev) => {
      const exists = prev.some((t) => t.id === transaction.id)
      if (exists) {
        return prev.map((t) => (t.id === transaction.id ? transaction : t))
      }
      return [transaction, ...prev]
    })
    setShowForm(false)
    setEditingTransaction(null)
  }

  function handleConfirmDelete() {
    setTransactions((prev) => prev.filter((t) => t.id !== pendingDelete.id))
    setPendingDelete(null)
  }

  function handleClearData() {
    clearAllData()
    setTransactions([])
  }

  function renderPage() {
    switch (page) {
      case 'transactions':
        return (
          <Transactions
            transactions={transactions}
            onEdit={openEditForm}
            onDelete={setPendingDelete}
            onAddClick={openAddForm}
          />
        )
      case 'analytics':
        return <Analytics transactions={transactions} />
      case 'settings':
        return (
          <Settings
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            budget={budget}
            onUpdateBudget={setBudget}
            transactions={transactions}
            onClearData={handleClearData}
          />
        )
      case 'dashboard':
      default:
        return (
          <Dashboard
            transactions={transactions}
            budget={budget}
            onUpdateBudget={setBudget}
            onAddClick={openAddForm}
          />
        )
    }
  }

  return (
    <div className="app-shell">
      <Sidebar currentPage={page} onNavigate={setPage} />

      <main className="app-main">
        {renderPage()}
      </main>

      <BottomNav currentPage={page} onNavigate={setPage} />

      {page !== 'settings' && (
        <button className="fab" onClick={openAddForm} aria-label="Add transaction">
          <Plus size={24} />
        </button>
      )}

      {showForm && (
        <TransactionForm
          initialTransaction={editingTransaction}
          onSave={handleSaveTransaction}
          onClose={() => { setShowForm(false); setEditingTransaction(null) }}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this transaction?"
          message="Are you sure you want to delete this transaction? This cannot be undone."
          confirmLabel="Delete"
          danger
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  )
}
