module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
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