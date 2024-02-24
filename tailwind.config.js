/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      backgroundImage: {
        "hospital-pattern": "url('../src/assets/images/hospital.jpg')",
      },
      backgroundColor: {
        primary: {
          50: "#0000007f", // 50% opacity
        },
      },
    },
  },
  plugins: [],
};
