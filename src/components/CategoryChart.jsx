import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#2F6F5E', '#A5503A', '#B8862B', '#5B7DB1', '#8A6BAF', '#4E9E8E', '#C77B4E', '#6B7368']

export default function CategoryChart({ data }) {
  if (data.length === 0) {
    return (
      <div className="card">
        <div className="card-title">Spending by Category</div>
        <div className="chart-empty">Not enough data. Add more transactions to see this chart.</div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-title">Spending by Category</div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`₹${value.toLocaleString('en-IN')}`, name]} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
