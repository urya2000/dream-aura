export const colors = {
  primary: {
    50: "#faf7ff",
    100: "#f4ecff",
    200: "#e9d8ff",
    300: "#d8b8ff",
    400: "#c084ff",
    500: "#6A0DAD", // Royal Purple
    600: "#5a0b92",
    700: "#4a0978",
    800: "#3a075e",
    900: "#2a0544",
  },
  accent: {
    50: "#fffef7",
    100: "#fffcec",
    200: "#fff8d1",
    300: "#fff2a8",
    400: "#ffe870",
    500: "#D4AF37", // Metallic Gold
    600: "#b8951f",
    700: "#9c7a15",
    800: "#805f0c",
    900: "#644505",
  },
  dark: {
    50: "#f7f8fa",
    100: "#eef0f4",
    200: "#d4d7e0",
    300: "#a8b0c4",
    400: "#7a85a1",
    500: "#191970", // Midnight Blue
    600: "#151561",
    700: "#111151",
    800: "#0d0d42",
    900: "#090932",
  },
  neutral: {
    50: "#fafafa",
    100: "#f8f8f2", // Ivory/Pearl
    200: "#f0f0ea",
    300: "#d3d3d3", // Misty Grey
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  white: "#F8F8F2", // Luxury White (Ivory/Pearl)
  black: "#191970", // Deep Blue instead of pure black
} as const;

export type ColorKey = keyof typeof colors;
export type ColorShade = keyof typeof colors.primary;
