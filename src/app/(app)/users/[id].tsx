import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  avatarColor,
  ErrorState,
  initials,
  SkeletonLine,
} from "../../../components/ui";
import { useUser } from "../../../hooks/useUsers";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = Number(id);
  const insets = useSafeAreaInsets();
  const { data: user, isLoading, isError, error, refetch } = useUser(userId);

  const color = user ? avatarColor(user.username) : "bg-slate-300";

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Could not load user"}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View
        className="absolute left-0 right-0 z-10 flex-row items-center justify-between px-4"
        style={{ top: insets.top + 8 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full bg-white/90 p-3 shadow-sm"
          style={{
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 8,
          }}
        >
          <SymbolView
            name="chevron.left"
            size={20}
            weight="semibold"
            tintColor="#0f172a"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 80,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View className="items-center gap-4">
            <View className="h-24 w-24 rounded-full bg-slate-200" />
            <SkeletonLine width="50%" />
            <SkeletonLine width="70%" />
          </View>
        ) : (
          <>
            <View className="items-center">
              <View
                className={`h-24 w-24 items-center justify-center rounded-full ${color}`}
              >
                <Text className="text-3xl font-bold text-white">
                  {initials(user!.username)}
                </Text>
              </View>
              <Text className="mt-4 text-2xl font-bold text-slate-900">
                {user!.username}
              </Text>
              <Text className="mt-1 text-base text-slate-500">
                {user!.email}
              </Text>
            </View>

            <View className="mt-8 gap-4">
              <InfoRow icon="envelope" label="Email" value={user!.email} />
              <InfoRow icon="phone" label="Phone" value={user!.phone ?? "—"} />
              <InfoRow
                icon="location"
                label="Address"
                value={
                  user!.address
                    ? `${user!.address.street}, ${user!.address.city}, ${user!.address.zipcode}`
                    : "—"
                }
              />
              <InfoRow
                icon="person.text.rectangle"
                label="Full Name"
                value={
                  user!.name
                    ? `${user!.name.firstname} ${user!.name.lastname}`
                    : "—"
                }
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-start rounded-2xl border border-slate-100 bg-white p-4">
      <View className="rounded-xl bg-slate-50 p-2">
        <SymbolView
          name={icon as any}
          size={20}
          weight="medium"
          tintColor="#64748b"
        />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </Text>
        <Text className="mt-1 text-base font-semibold text-slate-900">
          {value}
        </Text>
      </View>
    </View>
  );
}
