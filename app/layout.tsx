import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//SEO Metadata Object
export const metadata: Metadata = {
metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "GuruCool | Share Your Stories",
    template: "%s | GuruCool",
  },
  description: "A modern blogging platform for sharing insights and community stories.",
  keywords: ["Next.js", "Blogging", "GuruCool", "React"],
  openGraph: {
    title: "GuruCool",
    description: "Modern Blogging Platform",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "GuruCool",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  
};

//The Default Export (The component Next.js is looking for)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}