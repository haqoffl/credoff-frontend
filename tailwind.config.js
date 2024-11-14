/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "primary":"#3B37FF"
      },
      fontFamily:{
        poppins:"Poppins",
        notoSans:"Noto Sans",
      
      }
    },
  },
  plugins: [],
}

