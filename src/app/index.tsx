import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="mt-2 text-base text-sky-600">
        This is a React Native app using Tailwind CSS with Nativewind.
      </Text>
    </View>
  );
}
