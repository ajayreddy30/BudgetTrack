import { Pencil, Trash2 } from 'lucide-react'
import { formatDate } from '../utils/dateUtils'
import TransactionCard from './TransactionCard'
import EmptyState from './EmptyState'

export default function TransactionList({ transactions, onEdit, onDelete, onAdd, hasAnyTransactions }) {
  if (transactions.length === 0) {
    return hasAnyTransactions ? (
      <EmptyState
        title="No transactions found"
        description="Try changing your search or filters."
      />
    ) : (
      <EmptyState
        title="No transactions yet"
        description="Start tracking your spending by adding your first transaction."
        actionLabel="Add Transaction"
        onAction={onAdd}
      />
    )
  }

  return (
    <>
      <table className="txn-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Note</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{formatDate(t.date)}</td>
              <td>{t.note || '—'}</td>
              <td>{t.category}</td>
              <td>{t.paymentMethod}</td>
              <td><span className={`type-pill ${t.type}`}>{t.type === 'income' ? 'Income' : 'Expense'}</span></td>
              <td className={`money ${t.type === 'income' ? 'amount income' : 'amount expense'}`} style={{ fontSize: 14 }}>
                {t.type === 'income' ? '+' : '−'}₹{t.amount.toLocaleString('en-IN')}
              </td>
              <td>
                <div className="row-actions">
                  <button className="icon-btn" onClick={() => onEdit(t)} aria-label={`Edit transaction: ${t.note || t.category}`}>
                    <Pencil size={14} />
                  </button>
                  <button className="icon-btn" onClick={() => onDelete(t)} aria-label={`Delete transaction: ${t.note || t.category}`}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="txn-cards">
        {transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </>
  )
}
