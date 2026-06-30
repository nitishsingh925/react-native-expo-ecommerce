import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useAuthHydration } from "../hooks/useAuthHydration";
import { useAuthStore } from "../store/authStore";

export default function Index() {
  const hydrated = useAuthHydration();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-sm text-slate-500">Loading...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
