import { useState, useCallback } from 'react'
import { taskService } from '../services/taskService'
import toast from 'react-hot-toast'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' })

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await taskService.getAll(params)
      setTasks(data.data.tasks)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  const addTask = useCallback(async (payload) => {
    const { data } = await taskService.create(payload)
    setTasks((prev) => [data.data.task, ...prev])
    toast.success('Task created!')
    return data.data.task
  }, [])

  const toggleTask = useCallback(async (id) => {
    const { data } = await taskService.toggle(id)
    setTasks((prev) => prev.map((t) => (t.id === id ? data.data.task : t)))
    toast.success(`Marked as ${data.data.task.status}`)
  }, [])

  const removeTask = useCallback(async (id) => {
    await taskService.delete(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
    toast.success('Task deleted')
  }, [])

  const updateTask = useCallback(async (id, payload) => {
    const { data } = await taskService.update(id, payload)
    setTasks((prev) => prev.map((t) => (t.id === id ? data.data.task : t)))
    toast.success('Task updated')
    return data.data.task
  }, [])

  return {
    tasks,
    loading,
    filters,
    setFilters,
    fetchTasks,
    addTask,
    toggleTask,
    removeTask,
    updateTask,
  }
}
