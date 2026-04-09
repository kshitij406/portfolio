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
        bg: "var(--bg)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        border: "var(--border)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
