import { LayoutDashboard, ArrowLeftRight, PieChart, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={currentPage === id ? 'active' : ''}
          onClick={() => onNavigate(id)}
          aria-current={currentPage === id ? 'page' : undefined}
        >
          <Icon size={20} />
          {label}
        </button>
      ))}
    </nav>
  )
}
