import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import { LoadingProvider } from "@/components/loading-provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AuthJs",
  description: "next 14 auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <AuthProvider>
            <LoadingProvider>
              <Navbar />
              {children}
              <Toaster />
            </LoadingProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
