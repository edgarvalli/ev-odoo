export const colors = {
  primary: {
    bg: "#dbeafe", // bg-blue-100
    text: "#2563eb", // text-blue-600
    border: "#2563eb", // border-blue-600
    icon: "#1E88E5", // Blue 600
  },

  secondary: {
    bg: "#e0e7ff", // bg-indigo-100
    text: "#4f46e5", // text-indigo-600
    border: "#4f46e5", // border-indigo-600
    icon: "#5E35B1", // Indigo 600
  },

  success: {
    bg: "#dcfce7", // bg-green-100
    text: "#16a34a", // text-green-600
    border: "#16a34a", // border-green-600
    icon: "#43A047", // Green 600
  },

  warning: {
    bg: "#fef9c3", // bg-yellow-100
    text: "#a16207", // text-yellow-700
    border: "#a16207", // border-yellow-700
    icon: "#F9A825", // Yellow 800 (mejor contraste)
  },

  danger: {
    bg: "#fee2e2", // bg-red-100
    text: "#dc2626", // text-red-600
    border: "#dc2626", // border-red-600
    icon: "#E53935", // Red 600
  },

  info: {
    bg: "#cffafe", // bg-cyan-100
    text: "#0891b2", // text-cyan-600
    border: "#0891b2", // border-cyan-600
    icon: "#00ACC1", // Cyan 600
  },

  dark: {
    bg: "#1f2937", // bg-gray-800
    text: "#f3f4f6", // text-gray-100
    border: "#1f2937", // border-gray-800
    icon: "#ffffff", // White
  },

  light: {
    bg: "#f3f4f6", // bg-gray-100
    text: "#374151", // text-gray-700
    border: "#d1d5db", // border-gray-300
    icon: "#424242", // Grey 800
  },
} as const;

export type ColorKey = keyof typeof colors;
