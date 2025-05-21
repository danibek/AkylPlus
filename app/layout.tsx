import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import ThemeSwitch from "@/components/theme-switch";
import SupabaseProvider from "@/components/providers/supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AkylPlus",
  description: "Curses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <ConfettiProvider />
          <ToastProvider />
          {children}
          <ThemeSwitch />
        </SupabaseProvider>
      </body>
    </html>
  );
}
