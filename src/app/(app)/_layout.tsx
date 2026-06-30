import { Redirect, Slot } from "expo-router";
import { useAuthHydration } from "../../hooks/useAuthHydration";
import { useAuthStore } from "../../store/authStore";

export default function AppLayout() {
  const hydrated = useAuthHydration();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
