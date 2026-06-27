import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Origamie | Creative Studio — Websites & Brands Engineered to Convert",
  description: "Origamie is a creative studio for founders and marketing teams who want a beautiful site that actually sells. We design, build and grow it — typically 2–4x more qualified leads within 90 days.",
  keywords: ["Origamie", "creative studio", "web design", "branding", "conversion design", "digital marketing", "SEO", "web development", "app development"],
  openGraph: {
    title: "Origamie | Creative Studio",
    description: "Websites & brands engineered to convert. We design, build and grow it — typically 2–4x more qualified leads within 90 days.",
    type: "website",
    locale: "en_US",
    siteName: "Origamie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Origamie | Creative Studio",
    description: "Websites & brands engineered to convert.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
