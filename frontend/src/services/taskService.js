import api from './api'

export const taskService = {
  getAll: (params) => api.get('/tasks', { params }),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.patch(`/tasks/${id}`, data),
  toggle: (id) => api.patch(`/tasks/${id}/toggle`),
  delete: (id) => api.delete(`/tasks/${id}`),
}
