/** @type {import('tailwindcss').Config} */
const colors = {
  bg: "rgb(var(--color-bg) / <alpha-value>)",
  fg: "rgb(var(--color-fg) / <alpha-value>)",
  muted: "rgb(var(--color-muted) / <alpha-value>)",
  surface: "rgb(var(--color-surface) / <alpha-value>)",
  elevated: "rgb(var(--color-elevated) / <alpha-value>)",
  border: "rgb(var(--color-border) / <alpha-value>)",
  primary: "rgb(var(--color-primary) / <alpha-value>)",
  "primary-hover": "rgb(var(--color-primary-hover) / <alpha-value>)",
  "primary-fg": "rgb(var(--color-primary-fg) / <alpha-value>)",
  "primary-soft": "rgb(var(--color-primary-soft) / <alpha-value>)",
  secondary: "rgb(var(--color-secondary) / <alpha-value>)",
  accent: "rgb(var(--color-accent) / <alpha-value>)",
  success: "rgb(var(--color-success) / <alpha-value>)",
  danger: "rgb(var(--color-danger) / <alpha-value>)",
  ring: "rgb(var(--color-ring) / <alpha-value>)",
};

/** @type {Partial<import('tailwindcss').Config>} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors,
      borderColor: {
        DEFAULT: colors.border,
        ...colors,
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
      },
      spacing: {
        section: "var(--space-section)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms ease-out both",
      },
    },
  },
  plugins: [],
};
