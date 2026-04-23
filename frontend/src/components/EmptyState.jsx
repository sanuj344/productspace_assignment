import { ClipboardList } from 'lucide-react'

export default function EmptyState({ filtered }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-indigo-300" />
      </div>
      <h3 className="text-base font-600 text-slate-700 mb-1">
        {filtered ? 'No matching tasks' : 'No tasks yet'}
      </h3>
      <p className="text-sm text-slate-400 max-w-xs">
        {filtered
          ? 'Try adjusting your filters or search term.'
          : 'Create your first task to get started. Stay organised and ship faster!'}
      </p>
    </div>
  )
}
