"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense, useEffect, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ItemTotalsProvider } from "@/context/ItemTotalsContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <html lang="en">
          <body
            className={`${montserrat.className} bg-black h-auto text-white w-full`}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <header className="">
                <Navbar />
              </header>
              <main className="px-2.5 w-full">
                {isLoading && <LoadingSpinner />}
                {children}
              </main>
            </Suspense>
          </body>
        </html>
      </ItemTotalsProvider>
    </CartProvider>
  );
}
