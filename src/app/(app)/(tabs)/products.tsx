import { Image } from "expo-image";
import { router } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  EmptyState,
  ErrorState,
  formatPrice,
  getImageUrl,
  SkeletonCard,
  useCategoryColor,
} from "../../../components/ui";
import { useProducts } from "../../../hooks/useProducts";
import type { Product } from "../../../types/api";

function RatingStars({ rate }: { rate?: number }) {
  if (rate == null) return null;
  const fullStars = Math.round(rate);
  return (
    <View className="mt-2 flex-row items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <SymbolView
          key={i}
          name={i <= fullStars ? "star.fill" : "star"}
          size={12}
          weight="medium"
          tintColor={i <= fullStars ? "#f59e0b" : "#cbd5e1"}
        />
      ))}
      <Text className="ml-1 text-xs font-medium text-slate-500">
        {rate.toFixed(1)}
      </Text>
    </View>
  );
}

function ProductCard({ product }: { product: Product }) {
  const categoryStyle = useCategoryColor(product.category);

  return (
    <Card
      onPress={() => router.push(`/(app)/products/${product.id}` as any)}
      className="mb-4 overflow-hidden p-0"
    >
      <View className="flex-row">
        <View className="h-36 w-36 items-center justify-center rounded-l-3xl bg-white p-4">
          <Image
            source={{ uri: getImageUrl(product.image) }}
            contentFit="contain"
            style={{ width: "100%", height: "100%" }}
            transition={0}
            cachePolicy="memory-disk"
          />
        </View>
        <View className="flex-1 justify-center p-4">
          <View
            className={`mb-2 self-start rounded-full px-2.5 py-1 ${categoryStyle}`}
          >
            <Text
              className={`text-xs font-semibold ${categoryStyle.split(" ")[1]}`}
            >
              {product.category}
            </Text>
          </View>
          <Text
            className="text-base font-bold text-slate-900"
            numberOfLines={2}
          >
            {product.title}
          </Text>
          <RatingStars rate={product.rating?.rate} />
          <Text className="mt-2 text-lg font-bold text-blue-600">
            {formatPrice(product.price)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

function ProductSkeleton() {
  return (
    <View className="gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

export default function ProductsScreen() {
  const insets = useSafeAreaInsets();
  const { data: products, isLoading, isError, error, refetch } = useProducts();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory
        ? p.category === selectedCategory
        : true;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Could not load products"}
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
        <Text className="text-2xl font-bold text-slate-900">Products</Text>
        <Text className="text-sm text-slate-500">Browse our catalog</Text>

        <View className="mt-4 flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
          <Text className="text-slate-400">🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search products..."
            placeholderTextColor="#94a3b8"
            className="ml-3 flex-1 py-3 text-base text-slate-900"
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Text className="text-slate-400">✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {isLoading ? (
        <ScrollView
          className="flex-1 px-5 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <ProductSkeleton />
        </ScrollView>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="magnifyingglass"
          title="No products found"
          subtitle={
            query || selectedCategory
              ? "Try adjusting your search or filters"
              : "We couldn't find any products right now"
          }
          action={
            query || selectedCategory
              ? {
                  title: "Clear Filters",
                  onPress: () => {
                    setQuery("");
                    setSelectedCategory(null);
                  },
                }
              : undefined
          }
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          ListHeaderComponent={
            categories.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 12, gap: 8 }}
                className="mb-2"
              >
                <TouchableOpacity
                  onPress={() => setSelectedCategory(null)}
                  className={`rounded-full px-4 py-2 ${
                    selectedCategory === null ? "bg-blue-600" : "bg-slate-100"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedCategory === null
                        ? "text-white"
                        : "text-slate-700"
                    }`}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 ${
                      selectedCategory === category
                        ? "bg-blue-600"
                        : "bg-slate-100"
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        selectedCategory === category
                          ? "text-white"
                          : "text-slate-700"
                      }`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : null
          }
        />
      )}
    </View>
  );
}
