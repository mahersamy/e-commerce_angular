/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors:{
        "bg-main":"#0aad0a",
        
      }
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}