import { useState } from 'react'
import { Sun, Moon, Download, Trash2 } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'
import { exportTransactionsToCSV } from '../utils/csvExport'

export default function Settings({ theme, onToggleTheme, budget, onUpdateBudget, transactions, onClearData }) {
  const [budgetDraft, setBudgetDraft] = useState(String(budget))
  const [confirmClear, setConfirmClear] = useState(false)

  function saveBudget(e) {
    e.preventDefault()
    const amount = Number(budgetDraft)
    if (!Number.isNaN(amount) && amount > 0) {
      onUpdateBudget(amount)
    }
  }

  return (
    <>
      <div className="topbar">
        <div>
          <h1>Settings</h1>
          <div className="subtitle">Appearance, budget and your data</div>
        </div>
      </div>

      <div className="card section">
        <div className="card-title">Appearance</div>
        <div className="settings-row">
          <div>
            <div className="label">Theme</div>
            <div className="desc">Switch between light and dark mode</div>
          </div>
          <button className="theme-toggle" onClick={onToggleTheme}>
            {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>

      <div className="card section">
        <div className="card-title">Monthly Budget</div>
        <form onSubmit={saveBudget} style={{ display: 'flex', gap: 8, maxWidth: 320 }}>
          <input
            type="number"
            min="1"
            value={budgetDraft}
            onChange={(e) => setBudgetDraft(e.target.value)}
            aria-label="Monthly budget"
            style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
          />
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>

      <div className="card section">
        <div className="card-title">Data</div>
        <div className="settings-row">
          <div>
            <div className="label">Export all transactions</div>
            <div className="desc">Download a CSV file of everything you've recorded</div>
          </div>
          <button className="btn btn-secondary" onClick={() => exportTransactionsToCSV(transactions)}>
            <Download size={15} /> Export CSV
          </button>
        </div>
        <div className="settings-row">
          <div>
            <div className="label">Clear all data</div>
            <div className="desc">Permanently remove all saved transactions from this browser</div>
          </div>
          <button className="btn btn-danger" onClick={() => setConfirmClear(true)}>
            <Trash2 size={15} /> Clear Data
          </button>
        </div>
      </div>

      {confirmClear && (
        <ConfirmDialog
          title="Clear all data?"
          message="This will permanently remove all saved transactions from this browser. This cannot be undone."
          confirmLabel="Clear Data"
          danger
          onConfirm={() => { onClearData(); setConfirmClear(false) }}
          onCancel={() => setConfirmClear(false)}
        />
      )}
    </>
  )
}
