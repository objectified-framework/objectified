import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from '@/app/providers/AuthProvider';

const inter = Inter({ subsets: ["latin"] });

const APPLICATION_VERSION: string = '0.0.1';

export const metadata: Metadata = {
  title: "Objectified",
  description: "Objectified Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
