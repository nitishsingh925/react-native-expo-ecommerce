import { Tabs } from "expo-router";
import { SymbolView } from "../../../components/SymbolView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "#0f172a",
          shadowOpacity: 0.05,
          shadowRadius: 12,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: -4,
        },
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={focused ? "bag.fill" : "bag"}
              size={22}
              weight="medium"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="carts"
        options={{
          title: "Carts",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={focused ? "cart.fill" : "cart"}
              size={22}
              weight="medium"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={focused ? "person.2.fill" : "person.2"}
              size={22}
              weight="medium"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={focused ? "person.crop.circle.fill" : "person.crop.circle"}
              size={22}
              weight="medium"
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
