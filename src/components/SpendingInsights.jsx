import { Lightbulb } from 'lucide-react'

export default function SpendingInsights({ insights }) {
  return (
    <div className="card">
      <div className="card-title">Spending Insights</div>
      {insights.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
          Add a few transactions to see your spending insights.
        </p>
      ) : (
        insights.map((text, i) => (
          <div className="insight-item" key={i}>
            <Lightbulb size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
            <span>{text}</span>
          </div>
        ))
      )}
    </div>
  )
}
