import { api } from "../lib/api";
import type { Cart, CartProduct } from "../types/api";

export interface CartWithProducts extends Omit<Cart, "products"> {
  products: CartProduct[];
}

export const getAllCarts = async (): Promise<CartWithProducts[]> => {
  const { data } = await api.get<CartWithProducts[]>("/carts");
  return data;
};

export const getCartById = async (id: number): Promise<CartWithProducts> => {
  const { data } = await api.get<CartWithProducts>(`/carts/${id}`);
  return data;
};

export const addCart = async (
  cart: Omit<CartWithProducts, "id">,
): Promise<CartWithProducts> => {
  const { data } = await api.post<CartWithProducts>("/carts", cart);
  return data;
};

export const updateCart = async (
  id: number,
  cart: Partial<CartWithProducts>,
): Promise<CartWithProducts> => {
  const { data } = await api.put<CartWithProducts>(`/carts/${id}`, cart);
  return data;
};

export const deleteCart = async (id: number): Promise<void> => {
  await api.delete(`/carts/${id}`);
};
