import { SymbolView } from "./SymbolView";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
}

const variants = {
  primary: "bg-blue-600 active:bg-blue-700",
  secondary: "bg-slate-100 active:bg-slate-200",
  danger: "bg-red-500 active:bg-red-600",
  ghost: "bg-transparent active:bg-slate-100",
};

const textVariants = {
  primary: "text-white",
  secondary: "text-slate-900",
  danger: "text-white",
  ghost: "text-blue-600",
};

const sizes = {
  sm: "px-3 py-2",
  md: "px-5 py-3",
  lg: "px-6 py-4",
};

const textSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  icon,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center rounded-2xl ${variants[variant]} ${sizes[size]} ${
        disabled || loading ? "opacity-60" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" || variant === "danger" ? "#fff" : "#0f172a"
          }
          className="mr-2"
        />
      ) : icon ? (
        <SymbolView
          name={icon as any}
          size={18}
          weight="semibold"
          tintColor={
            variant === "primary" || variant === "danger" ? "#fff" : "#2563eb"
          }
          className="mr-2"
        />
      ) : null}
      <Text
        className={`text-center font-semibold ${textVariants[variant]} ${textSizes[size]}`}
      >
        {loading ? "Please wait..." : title}
      </Text>
    </TouchableOpacity>
  );
}

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize = "none",
  keyboardType = "default",
  multiline,
  numberOfLines,
  error,
}: InputProps) {
  return (
    <View>
      {label ? (
        <Text className="mb-2 text-sm font-semibold text-slate-700">
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? "top" : "center"}
        className={`rounded-2xl border bg-white px-4 py-3.5 text-base text-slate-900 ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      />
      {error ? (
        <Text className="mt-1.5 text-sm text-red-500">{error}</Text>
      ) : null}
    </View>
  );
}

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function Card({ children, onPress, className = "" }: CardProps) {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper
      onPress={onPress}
      className={`rounded-3xl border border-slate-100 bg-white p-4 shadow-sm ${
        onPress ? "active:bg-slate-50" : ""
      } ${className}`}
      style={{
        shadowColor: "#0f172a",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {children}
    </Wrapper>
  );
}

interface BadgeProps {
  text: string;
  variant?: "default" | "success" | "warning" | "info" | "danger";
}

const badgeVariants = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-blue-100 text-blue-700",
  danger: "bg-red-100 text-red-700",
};

export function Badge({ text, variant = "default" }: BadgeProps) {
  return (
    <View
      className={`self-start rounded-full px-3 py-1 ${badgeVariants[variant]}`}
    >
      <Text
        className={`text-xs font-semibold ${badgeVariants[variant].split(" ")[1]}`}
      >
        {text}
      </Text>
    </View>
  );
}

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
  action?: {
    title: string;
    onPress: () => void;
  };
}

export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="mb-4 rounded-full bg-slate-100 p-4">
        <SymbolView
          name={icon as any}
          size={40}
          weight="medium"
          tintColor="#64748b"
        />
      </View>
      <Text className="text-center text-lg font-bold text-slate-900">
        {title}
      </Text>
      {subtitle ? (
        <Text className="mt-2 text-center text-sm leading-5 text-slate-500">
          {subtitle}
        </Text>
      ) : null}
      {action ? (
        <View className="mt-6 w-full max-w-xs">
          <Button
            title={action.title}
            onPress={action.onPress}
            variant="secondary"
          />
        </View>
      ) : null}
    </View>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="mb-4 rounded-full bg-red-50 p-4">
        <SymbolView
          name="exclamationmark.triangle"
          size={36}
          weight="medium"
          tintColor="#ef4444"
        />
      </View>
      <Text className="text-center text-base font-semibold text-slate-900">
        Something went wrong
      </Text>
      <Text className="mt-2 text-center text-sm text-slate-500">{message}</Text>
      {onRetry ? (
        <View className="mt-6 w-full max-w-xs">
          <Button title="Try Again" onPress={onRetry} icon="arrow.clockwise" />
        </View>
      ) : null}
    </View>
  );
}

export function SkeletonCard() {
  return (
    <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
      <View className="flex-row items-center gap-4">
        <View className="h-20 w-20 rounded-2xl bg-slate-200" />
        <View className="flex-1 gap-2">
          <View className="h-4 w-3/4 rounded bg-slate-200" />
          <View className="h-3 w-1/2 rounded bg-slate-200" />
          <View className="h-3 w-1/4 rounded bg-slate-200" />
        </View>
      </View>
    </View>
  );
}

export function SkeletonLine({ width = "100%" }: { width?: string }) {
  return (
    <View
      className="h-4 rounded bg-slate-200"
      style={{ width: width as any }}
    />
  );
}

export function useCategoryColor(category: string) {
  return useMemo(() => {
    const map: Record<string, string> = {
      "men's clothing": "bg-indigo-100 text-indigo-700",
      "women's clothing": "bg-rose-100 text-rose-700",
      electronics: "bg-blue-100 text-blue-700",
      jewelry: "bg-amber-100 text-amber-700",
    };
    return map[category.toLowerCase()] ?? "bg-slate-100 text-slate-700";
  }, [category]);
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function avatarColor(name: string) {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function getImageUrl(url: string) {
  if (!url) return "";
  if (url.includes("fakestoreapi.com")) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  }
  return url;
}
