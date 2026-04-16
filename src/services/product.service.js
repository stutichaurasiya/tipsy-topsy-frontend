// src/services/product.service.js
import api from '@/lib/api';

export const productService = {
  getLatest: () => api.get('/products/latest'),   // ✅ Home page ke liye — latest 8 products
  getAll:    () => api.get('/products'),
  create:    (data) => api.post('/products', data),
  update:    (id, data) => api.put(`/products/${id}`, data),
  delete:    (id) => api.delete(`/products/${id}`),
};