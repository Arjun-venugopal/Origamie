import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boulevard | Design Studio — Reshaping Digital Experiences",
  description: "An agency that moves culture. Design studio that not only creates digital products but also experiences. Brand Identity, UI/UX Design, and Development.",
  keywords: ["design studio", "branding", "UI/UX design", "web development", "digital agency", "Boulevard"],
  openGraph: {
    title: "Boulevard | Design Studio",
    description: "An agency that moves culture. Design studio creating digital products and experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Boulevard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boulevard | Design Studio",
    description: "An agency that moves culture.",
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
      <body>{children}</body>
    </html>
  );
}
