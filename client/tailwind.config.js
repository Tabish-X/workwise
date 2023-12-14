/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          "primary":"#DC4434",
          "secondary": "#FC4404"
        },
        black: {
          "pure": "#000",
          "shade1": "#04040C",
          'shade2': "#242424"
        },
        gray:{
          "shade1": "#343434",
          "shade2":"#B2B2B2",
          "para":"#666666"
        },
        white: {
          "shade": "#C8C8C8",
          "pure": "#FFFFFF",
          "lite": "#F4F4F4",
          "gray":"#e5e5e5",
          "bg": "#f2f2f2"
        }
      }
    },
  },
  plugins: [],
}

