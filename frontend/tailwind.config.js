/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/components/**/*.{js,jsx}",
        "./src/pages/**/*.{js,jsx}",
        "./src/layouts/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#fc8a42",
                    DEFAULT: "#f57e33",
                    dark: "#e6732c",
                },
            },
        },
    },
    plugins: [],
};
