import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sam Filipiak | Software Engineer & Builder",
  description:
    "Portfolio of Samuel Filipiak — Senior Software Engineer with 7+ years building cloud-native systems, side projects, and products that matter.",
  keywords: [
    "Samuel Filipiak",
    "Software Engineer",
    "Portfolio",
    "Full Stack",
    "Azure",
    "React",
    "Next.js",
    "Cleveland",
  ],
  openGraph: {
    title: "Sam Filipiak | Software Engineer & Builder",
    description:
      "7+ years turning complex systems into reliable products. From enterprise telematics to side projects that ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mode="creative">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@300..800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
