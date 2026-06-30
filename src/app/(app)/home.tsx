import { Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../store/authStore";

export default function HomeScreen() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View className="flex-1 items-center justify-center bg-slate-100 px-6">
      <Text className="text-2xl font-bold text-slate-900">Home</Text>
      <Text className="mt-2 text-base text-slate-600">
        Welcome to your store!
      </Text>

      <TouchableOpacity
        onPress={logout}
        className="mt-8 rounded-xl bg-red-500 px-6 py-3"
      >
        <Text className="font-semibold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
