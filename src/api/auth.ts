import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuthStore } from "../store/authStore";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  return data;
};

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
};
