import { useState } from 'react'
import { Pencil } from 'lucide-react'

export default function BudgetHealth({ budget, spent, onUpdateBudget }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(budget))

  const percent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0
  const remaining = budget - spent

  let status = 'ok'
  let message = `You are doing well. ₹${remaining.toLocaleString('en-IN')} remaining.`
  if (spent > budget) {
    status = 'over'
    message = `You have exceeded your monthly budget by ₹${Math.abs(remaining).toLocaleString('en-IN')}.`
  } else if (percent >= 80) {
    status = 'warn'
    message = 'You are approaching your monthly budget.'
  }

  function saveBudget(e) {
    e.preventDefault()
    const amount = Number(draft)
    if (!Number.isNaN(amount) && amount > 0) {
      onUpdateBudget(amount)
      setEditing(false)
    }
  }

  const barColor = status === 'over' ? 'var(--expense)' : status === 'warn' ? 'var(--warning)' : 'var(--accent)'

  return (
    <div className="card">
      <div className="section-header" style={{ marginBottom: 0 }}>
        <div className="card-title" style={{ marginBottom: 0 }}>Budget Health</div>
        <button className="icon-btn" onClick={() => setEditing((v) => !v)} aria-label="Edit monthly budget">
          <Pencil size={13} />
        </button>
      </div>

      {editing ? (
        <form onSubmit={saveBudget} style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <input
            type="number"
            min="1"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Monthly budget amount"
            style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
          />
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span className="money" style={{ fontSize: 20, fontWeight: 600 }}>₹{spent.toLocaleString('en-IN')}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13, paddingTop: 6 }}>of ₹{budget.toLocaleString('en-IN')}</span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${percent}%`, background: barColor }} />
          </div>
          <div className={`status-message ${status}`}>{message}</div>
        </>
      )}
    </div>
  )
}
