import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        xx: "1000px",
        xxx: "1300px",
      },
    },
  },
  plugins: [],
};

export default config;