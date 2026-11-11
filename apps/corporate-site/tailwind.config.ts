import type { Config } from "tailwindcss";
import preset from "@folio/config/tailwind-preset";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [preset as unknown as Config],
};

export default config;
