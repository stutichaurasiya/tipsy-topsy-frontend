import api from "@/lib/api";

export const categoryService = {
  // Saari categories fetch karo
  getAll: () => api.get('/categories/allcategory'),

  // Nayi category banao
  create: (data) => api.post('/categories/create', data),

  // ✅ NEW: Ek category ke products fetch karo by name
  // Example: categoryService.getProductsByName("regular")
  getProductsByName: (name) => api.get(`/categories/products/${name}`),
};