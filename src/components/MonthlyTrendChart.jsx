import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { shortMonthLabel } from '../utils/dateUtils'

export default function MonthlyTrendChart({ data }) {
  const hasData = data.some((d) => d.amount > 0)
  const chartData = data.map((d) => ({ ...d, label: shortMonthLabel(d.month) }))

  if (!hasData) {
    return (
      <div className="card">
        <div className="card-title">Monthly Spending Trend</div>
        <div className="chart-empty">Not enough data. Add more transactions to see your trend.</div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-title">Monthly Spending Trend</div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Spent']} />
          <Line type="monotone" dataKey="amount" stroke="#A5503A" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
