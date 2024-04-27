/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f5a517",
          secondary: "#e6611e",
          accent: "#1c477c",
          neutral: "#fbbf24",
          "base-100": "#f3f3f3",
          info: "#06b6d4",
          success: "#22c55e",
          warning: "#fde047",
          error: "#dc2626",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
