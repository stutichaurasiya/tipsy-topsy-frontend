import api from "@/lib/api"

export const authService = {
  login: (data) => api.post('/auth/login', data),

  logout: () => api.post('/auth/logout'),

  getProfile: () => api.get('/auth/me'), // optional (current user)
};