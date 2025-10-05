import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header/Header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Sound Works",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
