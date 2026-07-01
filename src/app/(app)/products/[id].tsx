import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  ErrorState,
  formatPrice,
  getImageUrl,
  SkeletonLine,
  useCategoryColor,
} from "../../../components/ui";
import { useProduct } from "../../../hooks/useProducts";

function RatingBlock({ rate, count }: { rate?: number; count?: number }) {
  if (rate == null) return null;
  const fullStars = Math.round(rate);
  return (
    <View className="mt-4 flex-row items-center rounded-2xl bg-amber-50 px-4 py-3">
      <View className="flex-row items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <SymbolView
            key={i}
            name={i <= fullStars ? "star.fill" : "star"}
            size={16}
            weight="medium"
            tintColor={i <= fullStars ? "#f59e0b" : "#cbd5e1"}
          />
        ))}
      </View>
      <Text className="ml-2 text-base font-bold text-slate-900">
        {rate.toFixed(1)}
      </Text>
      <Text className="ml-1 text-sm text-slate-500">
        ({count ?? 0} reviews)
      </Text>
    </View>
  );
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const insets = useSafeAreaInsets();
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProduct(productId);
  const categoryStyle = useCategoryColor(product?.category ?? "");

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Could not load product"}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
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
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center rounded-b-[40px] bg-slate-50 px-8 py-16">
          {isLoading ? (
            <View className="h-72 w-full rounded-3xl bg-slate-200" />
          ) : (
            <Image
              source={{ uri: getImageUrl(product!.image) }}
              contentFit="contain"
              style={{ width: "100%", height: 288 }}
              transition={0}
              cachePolicy="memory-disk"
            />
          )}
        </View>

        <View className="px-6 pt-6">
          {isLoading ? (
            <View className="gap-3">
              <SkeletonLine width="30%" />
              <SkeletonLine width="80%" />
              <SkeletonLine width="40%" />
              <View className="mt-4 gap-2">
                <SkeletonLine width="100%" />
                <SkeletonLine width="90%" />
                <SkeletonLine width="70%" />
              </View>
            </View>
          ) : (
            <>
              <View
                className={`mb-3 self-start rounded-full px-3 py-1 ${categoryStyle}`}
              >
                <Text
                  className={`text-xs font-semibold ${categoryStyle.split(" ")[1]}`}
                >
                  {product!.category}
                </Text>
              </View>

              <Text className="text-3xl font-bold leading-9 text-slate-900">
                {product!.title}
              </Text>

              <Text className="mt-4 text-4xl font-bold text-blue-600">
                {formatPrice(product!.price)}
              </Text>

              <RatingBlock
                rate={product!.rating?.rate}
                count={product!.rating?.count}
              />

              <View className="mt-6 rounded-2xl bg-slate-50 p-5">
                <Text className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </Text>
                <Text className="mt-2 text-base leading-6 text-slate-700">
                  {product!.description}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {!isLoading && product ? (
        <View
          className="border-t border-slate-100 bg-white px-6 py-4"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <Button
            title="Add to Cart"
            icon="cart.badge.plus"
            onPress={() => {}}
          />
        </View>
      ) : null}
    </View>
  );
}
