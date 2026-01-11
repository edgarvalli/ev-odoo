import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import Icon, { iconTypes } from "./Icon";

export interface IButton extends TouchableOpacityProps {
  label?: string;
  color?: keyof typeof colors;
  className?: string;
  icon?: keyof typeof iconTypes;
  iconName?: string;
}

export const colors = {
  primary: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-600",
    icon: "#1E88E5", // Blue 600
  },

  secondary: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-600",
    icon: "#5E35B1", // Indigo 600
  },

  success: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-600",
    icon: "#43A047", // Green 600
  },

  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-700",
    icon: "#F9A825", // Yellow 800 (mejor contraste)
  },

  danger: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-600",
    icon: "#E53935", // Red 600
  },

  info: {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    border: "border-cyan-600",
    icon: "#00ACC1", // Cyan 600
  },

  dark: {
    bg: "bg-gray-800",
    text: "text-gray-100",
    border: "border-gray-800",
    icon: "#FFFFFF", // White
  },

  light: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
    icon: "#424242", // Grey 800
  },
} as const;

export default function Button({
  label,
  color = "primary",
  className,
  icon,
  iconName,
  ...props
}: IButton) {
  const c = colors[color];
  return (
    <TouchableOpacity
      className={`${c.bg} py-4 px-6 rounded-md flex flex-row justify-center items-center ${className}`}
      {...props}
    >
      {icon && (
        <Icon name={iconName ?? "home"} size={14} color={c.icon} type={icon} />
      )}
      <Text className={`${c.text} ${icon && "ms-2"}`}>{label}</Text>
    </TouchableOpacity>
  );
}
