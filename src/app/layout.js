import { Josefin_Sans, Patua_One } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-josefin',
    display: 'swap',
    preload: true,
});

const patuaOne = Patua_One({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-patua',
    display: 'swap',
    preload: true,
});

export const metadata = {
    title: "IdeaSpark",
    description: "A community-driven startup idea sharing and validation platform.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en"
            className={`${josefinSans.variable} ${patuaOne.variable} font-sans antialiased min-h-screen flex flex-col`}
        >
            <body className="min-h-full bg-white text-gray-900 dark:bg-[#0A0A0A] dark:text-gray-100 transition-colors duration-300">
                {children}
            </body>
        </html>
    );
}