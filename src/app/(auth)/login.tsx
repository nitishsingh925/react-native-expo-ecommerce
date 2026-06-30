import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useLogin } from "../../api/auth";
import { Button, Input } from "../../components/ui";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");

  const login = useLogin();

  const handleLogin = () => {
    login.mutate(
      { username, password },
      {
        onSuccess: () => {
          router.replace("/(app)/home");
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-8 py-12">
          <View className="mb-10">
            <Text className="text-3xl font-bold text-slate-900">
              Welcome Back
            </Text>
            <Text className="mt-2 text-base text-slate-500">
              Sign in to continue shopping
            </Text>
          </View>

          <View className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
            />
          </View>

          {login.isError && (
            <View className="mt-4 rounded-lg bg-red-50 px-4 py-3">
              <Text className="text-sm text-red-600">
                Login failed. Please check your credentials.
              </Text>
            </View>
          )}

          <View className="mt-8">
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={login.isPending}
              disabled={login.isPending}
            />
          </View>

          <View className="mt-6 rounded-lg bg-slate-50 p-4">
            <Text className="text-sm font-semibold text-slate-700">
              Demo credentials
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              Username: mor_2314
            </Text>
            <Text className="text-sm text-slate-500">Password: 83r5^_</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
