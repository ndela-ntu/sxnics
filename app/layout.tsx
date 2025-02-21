"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense, useEffect, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ItemTotalsProvider } from "@/context/ItemTotalsContext";
import RadioPlayer from "@/components/RadioPlayer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AudioContextProvider } from "@/context/AudioContext";
import { LayoutContent } from "@/components/LayoutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Radio Station",
    default: "SXNICS - Music episodes and blogs",
  },
  description: "Your underground music stop",
  metadataBase: new URL("https://sxnics.com"),
  // openGraph: {
  //   type: "website",
  //   siteName: "Sxnics",
  //   images: [
  //     {
  //       url: "/images/og-default.jpg", // Replace with your actual image
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  // },
}

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-black h-auto text-white w-full`}
      >
        <ErrorBoundary>
          <CartProvider>
            <ItemTotalsProvider>
              <AudioContextProvider>
                <LayoutContent>{children}</LayoutContent>
              </AudioContextProvider>
            </ItemTotalsProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
