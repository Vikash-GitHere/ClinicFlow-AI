import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1D9E75",
          dark: "#0F6E56",
          light: "#E1F5EE",
          mid: "#9FE1CB",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F1F3F7",
        },
        border: {
          DEFAULT: "#E4E7EE",
          strong: "#D1D5DF",
        },
        text: {
          DEFAULT: "#1A1D23",
          secondary: "#5A6070",
          muted: "#8A93A8",
        },
        status: {
          amber: "#F59E0B",
          red: "#EF4444",
          blue: "#3B82F6",
          purple: "#8B5CF6",
        },
      },
      borderRadius: {
        DEFAULT: "10px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
        "card-md": "0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
