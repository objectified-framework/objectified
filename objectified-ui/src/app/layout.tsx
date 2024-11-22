import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/app/components/SessionWrapper";
import {useSession} from "next-auth/react";
import Dashboard from "@/app/components/Dashboard";
import ConfirmDialog from "@/app/components/common/ConfirmDialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Objectified",
  description: "Objectified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <ConfirmDialog/>
          <Dashboard>{children}</Dashboard>
        </body>
      </html>
    </SessionWrapper>
  );
}
