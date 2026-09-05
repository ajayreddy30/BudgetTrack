import { Pencil, Trash2 } from 'lucide-react'
import { formatDate } from '../utils/dateUtils'

export default function TransactionCard({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === 'income'
  return (
    <div className="txn-card">
      <div className="txn-card-top">
        <div>
          <div className="note">{transaction.note || transaction.category}</div>
          <div className="meta">{transaction.category} · {transaction.paymentMethod} · {formatDate(transaction.date)}</div>
        </div>
        <div className={`money ${isIncome ? 'amount income' : 'amount expense'}`} style={{ fontSize: 16 }}>
          {isIncome ? '+' : '−'}₹{transaction.amount.toLocaleString('en-IN')}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <span className={`type-pill ${transaction.type}`}>{isIncome ? 'Income' : 'Expense'}</span>
        <div className="row-actions">
          <button className="icon-btn" onClick={() => onEdit(transaction)} aria-label="Edit transaction">
            <Pencil size={14} />
          </button>
          <button className="icon-btn" onClick={() => onDelete(transaction)} aria-label="Delete transaction">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
