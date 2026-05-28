import type { Metadata } from "next";
import {Plus_Jakarta_Sans, Inter} from "next/font/google";
import {Providers} from '@/store/Providers';
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400", "500", "700", "800"],
});

const displayFont = Inter({
    subsets: ["latin"],
    variable: "--font-display",
    weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
    title: "The Artisan Kiln - Order Form",
    description: "Custom ceramic tile visualization and checkout",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${sansFont.variable} ${displayFont.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}