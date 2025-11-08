import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";

// Asumsi Anda memiliki font ini di folder lokal
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
    title: "Gsuites - Booking Kost Eksklusif",
    description: "Temukan pilihan kost eksklusif dengan desain modern di lokasi terbaik.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // Mengubah lang="en" menjadi lang="id"
        <html lang="id">
            {/* Latar belakang body diubah menjadi hitam pekat (gray-900) */}
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#DAD7CD]`}
            >
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
}
