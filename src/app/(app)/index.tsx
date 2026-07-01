import { Redirect } from "expo-router";
import { useAuthHydration } from "../../hooks/useAuthHydration";
import { useAuthStore } from "../../store/authStore";

export default function Index() {
  const hydrated = useAuthHydration();
  const isAuthenticated = useAuthStore(
    (state: { isAuthenticated: boolean }) => state.isAuthenticated,
  );

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href={"/(app)/(tabs)/products" as any} />;
}
