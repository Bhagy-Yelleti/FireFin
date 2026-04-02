export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatShortDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  })
}

export const getCategoryColor = (category) => {
  const colors = {
    'Food & Dining': '#F59E0B',
    Transportation: '#3B82F6',
    Shopping: '#EC4899',
    Entertainment: '#8B5CF6',
    Utilities: '#10B981',
    Healthcare: '#EF4444',
    Subscriptions: '#6366F1',
    Groceries: '#14B8A6',
    Rent: '#F97316',
    Salary: '#10B981',
    Freelance: '#06B6D4',
    Bonus: '#84CC16',
    Other: '#64748B',
  }
  return colors[category] || '#64748B'
}

export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Amount', 'Category', 'Type', 'Description']
  const rows = transactions.map((t) => [
    t.date,
    t.amount,
    t.category,
    t.type,
    t.description,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}
