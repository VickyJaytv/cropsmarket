import { axiosInstance } from "./axiosInstance";

export const productService = {
  getProducts: async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
  },

  getProductById: async (productId: number) => {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
  },
};

export const categoryService = {
  getAllCategories: async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
  },
};
