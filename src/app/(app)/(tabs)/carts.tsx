import { router } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { useMemo } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { CartWithProducts } from "../../../api/carts";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  formatPrice,
  SkeletonCard,
} from "../../../components/ui";
import { useCarts } from "../../../hooks/useCarts";
import { useProducts } from "../../../hooks/useProducts";

function CartCard({
  cart,
  products,
}: {
  cart: CartWithProducts;
  products: any[];
}) {
  const total = useMemo(() => {
    return cart.products.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);
  }, [cart, products]);

  return (
    <Card
      onPress={() => router.push(`/(app)/carts/${cart.id}` as any)}
      className="mb-4"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="rounded-2xl bg-blue-50 p-3">
            <SymbolView
              name="cart.fill"
              size={24}
              weight="medium"
              tintColor="#2563eb"
            />
          </View>
          <View>
            <Text className="text-base font-bold text-slate-900">
              Cart #{cart.id}
            </Text>
            <Text className="text-sm text-slate-500">
              {cart.products.length}{" "}
              {cart.products.length === 1 ? "item" : "items"}
            </Text>
          </View>
        </View>
        <Text className="text-lg font-bold text-blue-600">
          {formatPrice(total)}
        </Text>
      </View>

      <View className="mt-4 flex-row flex-wrap gap-2">
        {cart.products.slice(0, 3).map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <Badge
              key={item.productId}
              text={`${item.quantity}× ${product?.title ?? "Unknown"}`}
              variant="default"
            />
          );
        })}
        {cart.products.length > 3 ? (
          <Badge text={`+${cart.products.length - 3} more`} variant="info" />
        ) : null}
      </View>
    </Card>
  );
}

function CartSkeleton() {
  return (
    <View className="gap-4">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

export default function CartsScreen() {
  const insets = useSafeAreaInsets();
  const {
    data: carts,
    isLoading: cartsLoading,
    isError: cartsError,
    error: cartsErrorMsg,
    refetch: refetchCarts,
  } = useCarts();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorMsg,
    refetch: refetchProducts,
  } = useProducts();

  const isLoading = cartsLoading || productsLoading;
  const isError = cartsError || productsError;
  const error = cartsError ? cartsErrorMsg : productsErrorMsg;

  const refetch = () => {
    refetchCarts();
    refetchProducts();
  };

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Could not load carts"}
        onRetry={refetch}
      />
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View
        className="border-b border-slate-100 bg-white px-5 pb-4 pt-2"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Text className="text-2xl font-bold text-slate-900">Carts</Text>
        <Text className="text-sm text-slate-500">Manage shopping carts</Text>
      </View>

      {isLoading ? (
        <ScrollView
          className="flex-1 px-5 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <CartSkeleton />
        </ScrollView>
      ) : carts?.length === 0 ? (
        <EmptyState
          icon="cart"
          title="No carts yet"
          subtitle="Create a cart to start shopping"
        />
      ) : (
        <FlatList
          data={carts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartCard cart={item} products={products ?? []} />
          )}
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
