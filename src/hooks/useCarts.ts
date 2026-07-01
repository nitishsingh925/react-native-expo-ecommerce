import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCart,
  deleteCart,
  getAllCarts,
  getCartById,
  updateCart,
  type CartWithProducts,
} from "../api/carts";

export const cartsKeys = {
  all: ["carts"] as const,
  lists: () => [...cartsKeys.all, "list"] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...cartsKeys.lists(), filters] as const,
  details: () => [...cartsKeys.all, "detail"] as const,
  detail: (id: number) => [...cartsKeys.details(), id] as const,
};

export const useCarts = () =>
  useQuery({
    queryKey: cartsKeys.list(),
    queryFn: getAllCarts,
  });

export const useCart = (id: number) =>
  useQuery({
    queryKey: cartsKeys.detail(id),
    queryFn: () => getCartById(id),
    enabled: id > 0,
  });

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartsKeys.lists() });
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      cart,
    }: {
      id: number;
      cart: Partial<CartWithProducts>;
    }) => updateCart(id, cart),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: cartsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cartsKeys.detail(id) });
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartsKeys.lists() });
    },
  });
};
