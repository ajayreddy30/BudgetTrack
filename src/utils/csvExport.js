// Builds a CSV file in the browser and triggers a download. No backend needed.

export function exportTransactionsToCSV(transactions) {
  const headers = ['Date', 'Type', 'Amount', 'Category', 'Note', 'Payment Method']
  const rows = transactions.map((t) => [
    t.date,
    t.type,
    t.amount,
    t.category,
    (t.note || '').replace(/"/g, '""'),
    t.paymentMethod || '',
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'expense-tracker-transactions.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
