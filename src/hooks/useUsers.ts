import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../api/users";
import type { User } from "../types/api";

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...usersKeys.lists(), filters] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: number) => [...usersKeys.details(), id] as const,
};

export const useUsers = () =>
  useQuery({
    queryKey: usersKeys.list(),
    queryFn: getAllUsers,
  });

export const useUser = (id: number) =>
  useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: id > 0,
  });

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
      updateUser(id, user),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(id) });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
};
