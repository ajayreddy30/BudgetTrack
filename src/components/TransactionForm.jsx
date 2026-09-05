import { useState } from 'react'
import { X } from 'lucide-react'
import { categoriesForType, PAYMENT_METHODS } from '../data/categories'

const emptyForm = {
  type: 'expense',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  note: '',
  paymentMethod: 'UPI',
}

export default function TransactionForm({ initialTransaction, onSave, onClose }) {
  const [form, setForm] = useState(() =>
    initialTransaction
      ? { ...initialTransaction, amount: String(initialTransaction.amount) }
      : emptyForm
  )
  const [errors, setErrors] = useState({})

  function updateField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      // Reset category to a valid one whenever the type changes.
      if (field === 'type') {
        next.category = categoriesForType(value)[0]
      }
      return next
    })
  }

  function validate() {
    const nextErrors = {}
    const amountNumber = Number(form.amount)
    if (!form.amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      nextErrors.amount = 'Please enter an amount greater than ₹0.'
    }
    if (!form.date) {
      nextErrors.date = 'Please choose a date.'
    }
    if (!form.category) {
      nextErrors.category = 'Please choose a category.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({
      ...form,
      id: initialTransaction?.id ?? `txn-${Date.now()}`,
      amount: Number(form.amount),
    })
  }

  const categories = categoriesForType(form.type)

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="txn-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="txn-form-title">{initialTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="txn-type">Transaction type</label>
            <div className="type-toggle" id="txn-type">
              <button
                type="button"
                className={`income${form.type === 'income' ? ' active' : ''}`}
                onClick={() => updateField('type', 'income')}
                aria-pressed={form.type === 'income'}
              >
                Income
              </button>
              <button
                type="button"
                className={`expense${form.type === 'expense' ? ' active' : ''}`}
                onClick={() => updateField('type', 'expense')}
                aria-pressed={form.type === 'expense'}
              >
                Expense
              </button>
            </div>
          </div>

          <div className="field">
            <label htmlFor="txn-amount">Amount (₹)</label>
            <input
              id="txn-amount"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={form.amount}
              onChange={(e) => updateField('amount', e.target.value)}
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? 'amount-error' : undefined}
            />
            {errors.amount && <div className="error" id="amount-error">{errors.amount}</div>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="txn-category">Category</label>
              <select
                id="txn-category"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="txn-date">Date</label>
              <input
                id="txn-date"
                type="date"
                value={form.date}
                onChange={(e) => updateField('date', e.target.value)}
                aria-invalid={Boolean(errors.date)}
              />
              {errors.date && <div className="error">{errors.date}</div>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="txn-payment">Payment method</label>
            <select
              id="txn-payment"
              value={form.paymentMethod}
              onChange={(e) => updateField('paymentMethod', e.target.value)}
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="txn-note">Note</label>
            <textarea
              id="txn-note"
              value={form.note}
              onChange={(e) => updateField('note', e.target.value)}
              placeholder="What was this for?"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {initialTransaction ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  )
}
