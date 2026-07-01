import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ErrorState, formatPrice, getImageUrl, SkeletonCard } from "../../../components/ui";
import { useCart } from "../../../hooks/useCarts";
import { useProducts } from "../../../hooks/useProducts";

export default function CartDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cartId = Number(id);
  const insets = useSafeAreaInsets();
  const { data: cart, isLoading, isError, error, refetch } = useCart(cartId);
  const { data: products } = useProducts();

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Could not load cart"}
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
          paddingTop: insets.top + 64,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View className="gap-4 pt-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : (
          <>
            <View className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <View className="flex-row items-center gap-3">
                <View className="rounded-2xl bg-blue-50 p-3">
                  <SymbolView
                    name="cart.fill"
                    size={28}
                    weight="medium"
                    tintColor="#2563eb"
                  />
                </View>
                <View>
                  <Text className="text-2xl font-bold text-slate-900">
                    Cart #{cart!.id}
                  </Text>
                  <Text className="text-sm text-slate-500">
                    User ID: {cart!.userId}
                  </Text>
                </View>
              </View>
            </View>

            <Text className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Items
            </Text>

            {cart!.products.map((item) => {
              const product = products?.find((p) => p.id === item.productId);
              return (
                <View
                  key={item.productId}
                  className="mb-4 flex-row items-center rounded-2xl border border-slate-100 bg-white p-4"
                >
                  <View className="h-16 w-16 items-center justify-center rounded-xl bg-slate-50 p-2">
                    {product ? (
                      <Image
                        source={{ uri: getImageUrl(product.image) }}
                        contentFit="contain"
                        style={{ width: "100%", height: "100%" }}
                        transition={0}
                      />
                    ) : (
                      <SymbolView name="bag" size={24} tintColor="#94a3b8" />
                    )}
                  </View>
                  <View className="ml-4 flex-1">
                    <Text
                      className="text-base font-semibold text-slate-900"
                      numberOfLines={1}
                    >
                      {product?.title ?? `Product #${item.productId}`}
                    </Text>
                    <Text className="mt-1 text-sm text-slate-500">
                      Qty: {item.quantity}
                    </Text>
                  </View>
                  <Text className="text-base font-bold text-blue-600">
                    {formatPrice((product?.price ?? 0) * item.quantity)}
                  </Text>
                </View>
              );
            })}

            <View className="mt-4 rounded-2xl bg-slate-900 p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-white">
                  Total
                </Text>
                <Text className="text-2xl font-bold text-white">
                  {formatPrice(
                    cart!.products.reduce((sum, item) => {
                      const product = products?.find(
                        (p) => p.id === item.productId,
                      );
                      return sum + (product?.price ?? 0) * item.quantity;
                    }, 0),
                  )}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
