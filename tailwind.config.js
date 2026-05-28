module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                kiln: {
                    bg: "var(--color-kiln-bg)",
                    navy: "var(--color-kiln-navy)",
                    terracotta: "var(--color-kiln-terracotta)",
                    green: "var(--color-kiln-green)",
                    sand: "var(--color-kiln-sand)",
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['var(--font-display)', 'serif'],
            }
        },
    },
    plugins: [],
}