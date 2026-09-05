import { useState } from 'react'
import CategoryChart from '../components/CategoryChart'
import MonthlyTrendChart from '../components/MonthlyTrendChart'
import MonthlySummary from '../components/MonthlySummary'
import { getCategoryBreakdown, getMonthlyTrend } from '../utils/calculations'
import { currentMonthKey } from '../utils/dateUtils'

export default function Analytics({ transactions }) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonthKey())

  const categoryData = getCategoryBreakdown(transactions, 'expense')
  const trendData = getMonthlyTrend(transactions, 6)

  return (
    <>
      <div className="topbar">
        <div>
          <h1>Analytics</h1>
          <div className="subtitle">Where your money comes from and where it goes</div>
        </div>
      </div>

      <div className="grid-2 section">
        <CategoryChart data={categoryData} />
        <MonthlyTrendChart data={trendData} />
      </div>

      <MonthlySummary
        transactions={transactions}
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
      />
    </>
  )
}
