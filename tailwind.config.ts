import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "#ff0033",
        surface: {
          DEFAULT: "var(--vt-bg)",
          raised: "var(--vt-bg-raised)",
          hover: "var(--vt-hover)",
          chip: "var(--vt-chip)",
          chipHover: "var(--vt-chip-hover)",
        },
        ink: {
          DEFAULT: "var(--vt-text)",
          muted: "var(--vt-text-muted)",
        },
        line: "var(--vt-border)",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "system-ui", "sans-serif"],
      },
      // Spacing tokens so h-header, pt-header, top-header, w-sidebar, ml-sidebar-mini etc. all work
      spacing: { header: "56px", sidebar: "240px", "sidebar-mini": "72px" },
    },
  },
  plugins: [],
};

export default config;
