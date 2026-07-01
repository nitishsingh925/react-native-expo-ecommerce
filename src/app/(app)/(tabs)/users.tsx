import { router } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  avatarColor,
  Card,
  EmptyState,
  ErrorState,
  initials,
  SkeletonCard,
} from "../../../components/ui";
import { useUsers } from "../../../hooks/useUsers";
import type { User } from "../../../types/api";

function UserCard({ user }: { user: User }) {
  const color = avatarColor(user.username);

  return (
    <Card
      onPress={() => router.push(`/(app)/users/${user.id}` as any)}
      className="mb-4"
    >
      <View className="flex-row items-center gap-4">
        <View
          className={`h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          <Text className="text-lg font-bold text-white">
            {initials(user.username)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-slate-900">
            {user.username}
          </Text>
          <Text className="mt-0.5 text-sm text-slate-500" numberOfLines={1}>
            {user.email}
          </Text>
        </View>
        <SymbolView name="chevron.right" size={18} tintColor="#94a3b8" />
      </View>
    </Card>
  );
}

function UserSkeleton() {
  return (
    <View className="gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

export default function UsersScreen() {
  const insets = useSafeAreaInsets();
  const { data: users, isLoading, isError, error, refetch } = useUsers();

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Could not load users"}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View
        className="border-b border-slate-100 bg-white px-5 pb-4 pt-2"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Text className="text-2xl font-bold text-slate-900">Users</Text>
        <Text className="text-sm text-slate-500">Registered accounts</Text>
      </View>

      {isLoading ? (
        <ScrollView
          className="flex-1 px-5 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <UserSkeleton />
        </ScrollView>
      ) : users?.length === 0 ? (
        <EmptyState icon="person.2" title="No users found" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserCard user={item} />}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        />
      )}
    </View>
  );
}
