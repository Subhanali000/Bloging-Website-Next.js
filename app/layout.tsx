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

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "GuruCool | Modern Blogging Platform",
    template: "%s | GuruCool",
  },

  description:
    "GuruCool is a modern Next.js blogging platform where users can create, share, and explore rich content blogs with a professional UI.",

  keywords: [
    "blog platform",
    "Next.js blog",
    "GuruCool",
    "modern blogging",
    "React blog website",
  ],

  authors: [{ name: "GuruCool Team" }],

  creator: "GuruCool",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "GuruCool — Share Your Stories",
    description:
      "Create and share modern blogs with GuruCool’s rich editor and professional design.",
    url: baseUrl,
    siteName: "GuruCool",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "GuruCool Blogging Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GuruCool — Blogging Platform",
    description:
      "Create and share modern blogs with GuruCool.",
    images: [`${baseUrl}/og-image.jpg`],
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
