import { Search } from 'lucide-react'

const STATUS_OPTIONS = [
  { label: 'All Status', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
]

const PRIORITY_OPTIONS = [
  { label: 'All Priority', value: '' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2.5">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all shadow-sm"
        />
      </div>

      {/* Status */}
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700
          focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all shadow-sm"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Priority */}
      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700
          focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all shadow-sm"
      >
        {PRIORITY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
