import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
}

const variants = {
  primary: "bg-blue-600",
  secondary: "bg-slate-200",
  danger: "bg-red-500",
};

const textVariants = {
  primary: "text-white",
  secondary: "text-slate-900",
  danger: "text-white",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  loading,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-xl py-4 ${variants[variant]} ${
        disabled || loading ? "opacity-60" : ""
      }`}
    >
      <Text
        className={`text-center text-base font-semibold ${textVariants[variant]}`}
      >
        {loading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize = "none",
}: InputProps) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-slate-700">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900"
      />
    </View>
  );
}
