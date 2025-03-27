import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/shared/Navigation";
import EnvironmentIndicator from "@/components/shared/EnvironmentIndicator";
import { ThemeProvider } from "@/providers/ThemeProvider";
// import { StoreHydration } from '@/components/providers/StoreHydration';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
        <LanguageProvider>
          <ThemeProvider>
            <Navigation />
            <div className="min-h-[calc(100vh-65px)]">
              {children}
            </div>
            <EnvironmentIndicator />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
