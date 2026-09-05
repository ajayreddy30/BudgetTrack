export default function SummaryCard({ label, amount, icon: Icon, tone, sub }) {
  const amountClass = tone === 'income' ? 'amount income' : tone === 'expense' ? 'amount expense' : 'amount'
  return (
    <div className="summary-card">
      <div className="label">
        {Icon && <Icon size={15} />}
        {label}
      </div>
      <div className={`${amountClass} money`}>
        ₹{Math.abs(amount).toLocaleString('en-IN')}
      </div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  )
}
