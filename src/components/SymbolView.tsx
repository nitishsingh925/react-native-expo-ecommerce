import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  // Tabs Layout
  "bag": "bag-outline",
  "bag.fill": "bag",
  "cart": "cart-outline",
  "cart.fill": "cart",
  "person.2": "people-outline",
  "person.2.fill": "people",
  "person.crop.circle": "person-circle-outline",
  "person.crop.circle.fill": "person-circle",

  // Stars / Rating
  "star": "star-outline",
  "star.fill": "star",

  // Navigation
  "chevron.left": "chevron-back",
  "chevron.right": "chevron-forward",

  // General & Login
  "person.fill": "person",
  "exclamationmark.triangle": "warning-outline",
  "arrow.clockwise": "refresh",
  "magnifyingglass": "search",
  "cart.badge.plus": "cart-outline",
  "arrow.right.square": "log-out-outline",

  // Info rows / user details
  "envelope": "mail-outline",
  "phone": "call-outline",
  "location": "location-outline",
  "person.text.rectangle": "id-card-outline",
};

interface SymbolViewProps {
  name: string;
  size?: number;
  tintColor?: string;
  className?: string;
  style?: any;
  weight?: string;
}

export function SymbolView({
  name,
  size = 24,
  tintColor = "#000",
  className,
  style,
}: SymbolViewProps) {
  const ioniconName = ICON_MAP[name] || "help-circle-outline";
  return (
    <Ionicons
      name={ioniconName}
      size={size}
      color={tintColor}
      className={className}
      style={style}
    />
  );
}
