import { router } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card } from "../../../components/ui";
import { useAuthStore } from "../../../store/authStore";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View
        className="border-b border-slate-100 bg-white px-5 pb-6"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Text className="text-2xl font-bold text-slate-900">Profile</Text>
        <Text className="text-sm text-slate-500">Account settings & info</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-blue-600">
            <SymbolView
              name="person.fill"
              size={40}
              weight="medium"
              tintColor="#fff"
            />
          </View>
          <Text className="mt-4 text-xl font-bold text-slate-900">
            Authenticated User
          </Text>
          <Text className="mt-1 text-sm text-slate-500">You are signed in</Text>
        </View>

        <Text className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
          App
        </Text>

        <Card className="mb-4 p-0 overflow-hidden">
          <MenuItem
            icon="bag"
            label="Products"
            onPress={() => router.push("/(app)/(tabs)/products" as any)}
          />
          <MenuItem
            icon="cart"
            label="Carts"
            onPress={() => router.push("/(app)/(tabs)/carts" as any)}
          />
          <MenuItem
            icon="person.2"
            label="Users"
            onPress={() => router.push("/(app)/(tabs)/users" as any)}
          />
        </Card>

        <Text className="mb-3 mt-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Account
        </Text>

        <Card className="mb-6 p-0 overflow-hidden">
          <MenuItem
            icon="arrow.right.square"
            label="Sign Out"
            color="#ef4444"
            onPress={handleLogout}
          />
        </Card>

        <Text className="text-center text-xs text-slate-400">
          FakeStore E-Commerce Demo v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

function MenuItem({
  icon,
  label,
  color = "#0f172a",
  onPress,
}: {
  icon: string;
  label: string;
  color?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-slate-100 px-4 py-4 active:bg-slate-50"
    >
      <View className="flex-row items-center gap-3">
        <SymbolView
          name={icon as any}
          size={20}
          weight="medium"
          tintColor={color}
        />
        <Text className="text-base font-semibold" style={{ color }}>
          {label}
        </Text>
      </View>
      <SymbolView name="chevron.right" size={16} tintColor="#94a3b8" />
    </TouchableOpacity>
  );
}
