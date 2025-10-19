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
      <body className="flex">
        <Providers>
          <Header/>
          <main className="flex flex-col p-5 overflow-auto isolate md:ml-(--header-width)  max-sm:pb-[150px] md:pb-[70px] gap-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
