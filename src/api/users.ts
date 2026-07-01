import { api } from "../lib/api";
import type { User } from "../types/api";

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const { data } = await api.post<User>("/users", user);
  return data;
};

export const updateUser = async (
  id: number,
  user: Partial<User>,
): Promise<User> => {
  const { data } = await api.put<User>(`/users/${id}`, user);
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
