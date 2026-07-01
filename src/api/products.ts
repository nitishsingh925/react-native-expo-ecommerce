import { api } from "../lib/api";
import type { Product } from "../types/api";

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const addProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const { data } = await api.post<Product>("/products", product);
  return data;
};

export const updateProduct = async (
  id: number,
  product: Partial<Product>,
): Promise<Product> => {
  const { data } = await api.put<Product>(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
