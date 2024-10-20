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

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate a delay to show the loading indicator
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <CartProvider>
      <ItemTotalsProvider>
        <AudioContextProvider>
          <html lang="en">
            <body
              className={`${montserrat.className} bg-black h-auto text-white w-full`}
            >
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <header className="px-2.5 w-full sticky top-0 z-20 bg-black">
                    <Navbar />
                    <RadioPlayer />
                  </header>
                  <main className="px-2.5 w-full z-10">
                    {isLoading && <LoadingSpinner />}
                    {children}
                  </main>
                </Suspense>
              </ErrorBoundary>
            </body>
          </html>
        </AudioContextProvider>
      </ItemTotalsProvider>
    </CartProvider>
  );
}
