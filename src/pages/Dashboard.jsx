import { Wallet, TrendingUp, TrendingDown, CalendarDays, Plus } from 'lucide-react'
import SummaryCard from '../components/SummaryCard'
import BudgetHealth from '../components/BudgetHealth'
import SpendingInsights from '../components/SpendingInsights'
import { getTotalIncome, getTotalExpenses, getBalance, getCurrentMonthExpenses } from '../utils/calculations'
import { generateInsights } from '../utils/insights'
import { monthKeyToLabel, currentMonthKey } from '../utils/dateUtils'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard({ transactions, budget, onUpdateBudget, onAddClick }) {
  const income = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)
  const balance = getBalance(transactions)
  const monthExpenses = getCurrentMonthExpenses(transactions)
  const insights = generateInsights(transactions)

  return (
    <>
      <div className="topbar">
        <div>
          <h1>{greeting()}</h1>
          <div className="subtitle">
            <CalendarDays size={13} style={{ verticalAlign: '-2px', marginRight: 4 }} />
            {monthKeyToLabel(currentMonthKey())}
          </div>
        </div>
        <button className="btn btn-primary" onClick={onAddClick}>
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      <div className="summary-grid">
        <SummaryCard label="Total Balance" amount={balance} icon={Wallet} />
        <SummaryCard label="Income" amount={income} icon={TrendingUp} tone="income" />
        <SummaryCard label="Expenses" amount={expenses} icon={TrendingDown} tone="expense" />
        <SummaryCard label="This Month" amount={monthExpenses} icon={CalendarDays} tone="expense" />
      </div>

      <div className="grid-2">
        <BudgetHealth budget={budget} spent={monthExpenses} onUpdateBudget={onUpdateBudget} />
        <SpendingInsights insights={insights} />
      </div>
    </>
  )
}
