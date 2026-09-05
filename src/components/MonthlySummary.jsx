import { getMonthSummary } from '../utils/calculations'
import { getLastNMonthKeys, monthKeyToLabel } from '../utils/dateUtils'

export default function MonthlySummary({ transactions, selectedMonth, onSelectMonth }) {
  const summary = getMonthSummary(transactions, selectedMonth)
  const monthOptions = getLastNMonthKeys(12).reverse()

  return (
    <div className="card">
      <div className="section-header">
        <div className="card-title" style={{ marginBottom: 0 }}>Monthly Summary</div>
        <select
          value={selectedMonth}
          onChange={(e) => onSelectMonth(e.target.value)}
          aria-label="Select month"
          style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: 13 }}
        >
          {monthOptions.map((m) => (
            <option key={m} value={m}>{monthKeyToLabel(m)}</option>
          ))}
        </select>
      </div>

      <div className="grid-2" style={{ gap: 12 }}>
        <SummaryLine label="Total income" value={`₹${summary.income.toLocaleString('en-IN')}`} />
        <SummaryLine label="Total expenses" value={`₹${summary.expenses.toLocaleString('en-IN')}`} />
        <SummaryLine
          label="Savings"
          value={`${summary.savings >= 0 ? '' : '−'}₹${Math.abs(summary.savings).toLocaleString('en-IN')}`}
        />
        <SummaryLine label="Transactions" value={summary.transactionCount} />
        <SummaryLine label="Top category" value={summary.topCategory ? summary.topCategory.category : '—'} />
        <SummaryLine
          label="Largest expense"
          value={summary.largestTransaction ? `₹${summary.largestTransaction.amount.toLocaleString('en-IN')}` : '—'}
        />
      </div>
    </div>
  )
}

function SummaryLine({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
      <div className="money" style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  )
}
