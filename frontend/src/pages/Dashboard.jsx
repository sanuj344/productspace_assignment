import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../hooks/useTasks'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import AddTaskModal from '../components/AddTaskModal'
import EmptyState from '../components/EmptyState'
import FilterBar from '../components/FilterBar'
import Spinner from '../components/Spinner'
import { Plus, CheckCircle2, Clock, ListTodo } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const {
    tasks,
    loading,
    filters,
    setFilters,
    fetchTasks,
    addTask,
    toggleTask,
    removeTask,
  } = useTasks()

  const [showModal, setShowModal] = useState(false)

  // Fetch tasks whenever filters change (debounced via useEffect)
  useEffect(() => {
    const params = {}
    if (filters.status) params.status = filters.status
    if (filters.priority) params.priority = filters.priority
    if (filters.search) params.search = filters.search
    fetchTasks(params)
  }, [filters, fetchTasks])

  // Stats
  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'Completed').length
  const pending = total - completed

  const isFiltered = !!(filters.status || filters.priority || filters.search)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-700 text-slate-900 tracking-tight">
            Good day, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here's what's on your plate today.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<ListTodo className="w-5 h-5 text-indigo-500" />}
            label="Total"
            value={total}
            bg="bg-indigo-50"
          />
          <StatCard
            icon={<Clock className="w-5 h-5 text-amber-500" />}
            label="Pending"
            value={pending}
            bg="bg-amber-50"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            label="Completed"
            value={completed}
            bg="bg-emerald-50"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="flex-1 w-full">
            <FilterBar filters={filters} onChange={setFilters} />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 text-white text-sm font-500 rounded-xl
              hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-200 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Task List */}
        {loading ? (
          <Spinner size="lg" className="py-20" />
        ) : tasks.length === 0 ? (
          <EmptyState filtered={isFiltered} />
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={removeTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal onClose={() => setShowModal(false)} onAdd={addTask} />
      )}
    </div>
  )
}

function StatCard({ icon, label, value, bg }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-700 text-slate-900 leading-tight">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  )
}
