import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

const PRIORITIES = ['Low', 'Medium', 'High']

export default function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    setSubmitting(true)
    try {
      await onAdd({ ...form, dueDate: form.dueDate || undefined })
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-600 text-slate-900">New Task</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1.5">
              Description <span className="text-slate-400">(optional)</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add more context..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Priority + Due Date row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1.5">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all"
              >
                {PRIORITIES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1.5">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-500 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-500
                hover:bg-indigo-600 disabled:opacity-60 transition-colors cursor-pointer shadow-sm"
            >
              {submitting ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
