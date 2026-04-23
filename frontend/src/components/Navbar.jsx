import { useAuth } from '../context/AuthContext'
import { LogOut, CheckSquare, User } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-sm">
            <CheckSquare className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-700 text-slate-900 tracking-tight">
            Task<span className="text-indigo-500">Flow</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <span className="text-sm font-500 text-slate-700">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-150 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
