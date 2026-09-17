import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jake The Drummer",
  description:
    "Jake The Drummer — cinematic drum covers, first-person POV sessions, and raw percussion content. Based online, felt everywhere.",
  keywords: ["Jake The Drummer", "drum covers", "POV drums", "cinematic drumming", "drummer"],
  openGraph: {
    title: "Jake The Drummer",
    description: "Cinematic drum covers and first-person POV sessions.",
    url: "https://thejacobparsons.com",
    siteName: "Jake The Drummer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jake The Drummer",
    description: "Cinematic drum covers and first-person POV sessions.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
