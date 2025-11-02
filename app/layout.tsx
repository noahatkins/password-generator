import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Password Generator | Secure & Memorable Passwords",
    template: "%s | Password Generator",
  },
  description:
    "Generate secure, random, and memorable passwords for your accounts. Free, open-source password generator with customizable length, symbols, and numbers. Create strong passwords instantly.",
  keywords: [
    "password generator",
    "secure password",
    "random password",
    "memorable password",
    "password creator",
    "strong password",
    "password tool",
    "secure passwords",
    "password maker",
  ],
  authors: [{name: "Noah Atkins"}],
  creator: "Noah Atkins",
  publisher: "Noah Atkins",
  metadataBase: new URL("https://passgen.noahatkins.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://passgen.noahatkins.com",
    siteName: "Password Generator",
    title: "Password Generator | Secure & Memorable Passwords",
    description:
      "Generate secure, random, and memorable passwords for your accounts. Free, open-source password generator with customizable options.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Password Generator - Secure Password Creation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator | Secure & Memorable Passwords",
    description:
      "Generate secure, random, and memorable passwords for your accounts. Free, open-source password generator.",
    images: ["/og-image.png"],
    creator: "@noahatkins",
  },
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
