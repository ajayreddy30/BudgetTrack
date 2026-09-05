import { LayoutDashboard, ArrowLeftRight, PieChart, Settings, Wallet } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar-brand">
        <Wallet size={18} style={{ verticalAlign: '-3px', marginRight: 6 }} />
        Budget<span>Track</span>
      </div>
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`sidebar-link${currentPage === id ? ' active' : ''}`}
          onClick={() => onNavigate(id)}
          aria-current={currentPage === id ? 'page' : undefined}
        >
          <Icon size={17} />
          {label}
        </button>
      ))}
    </nav>
  )
}
