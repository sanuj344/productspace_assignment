import { CheckCircle2, Circle, Trash2, Calendar, Flag } from 'lucide-react'

const PRIORITY_STYLES = {
  High: 'bg-red-50 text-red-600 border-red-100',
  Medium: 'bg-amber-50 text-amber-600 border-amber-100',
  Low: 'bg-emerald-50 text-emerald-600 border-emerald-100',
}

const PRIORITY_DOT = {
  High: 'bg-red-400',
  Medium: 'bg-amber-400',
  Low: 'bg-emerald-400',
}

function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function TaskCard({ task, onToggle, onDelete }) {
  const isCompleted = task.status === 'Completed'
  const due = formatDate(task.dueDate)

  return (
    <div
      className={`group relative bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 p-5 flex gap-4 items-start
        ${isCompleted ? 'border-slate-100 opacity-70' : 'border-slate-200 hover:border-indigo-200'}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => onToggle(task.id)}
        className="mt-0.5 flex-shrink-0 text-slate-300 hover:text-indigo-500 transition-colors duration-150 cursor-pointer"
        title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-500 text-slate-900 text-sm leading-snug mb-1 truncate ${
            isCompleted ? 'line-through text-slate-400' : ''
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-xs text-slate-400 mb-2 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Priority badge */}
          <span
            className={`inline-flex items-center gap-1 text-xs font-500 px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[task.priority]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[task.priority]}`} />
            {task.priority}
          </span>

          {/* Due date */}
          {due && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" />
              {due}
            </span>
          )}

          {/* Status */}
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-500 ${
              isCompleted
                ? 'bg-indigo-50 text-indigo-500'
                : 'bg-slate-50 text-slate-400'
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all duration-150 p-1 rounded-lg hover:bg-red-50 cursor-pointer"
        title="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
