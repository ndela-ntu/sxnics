import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ItemTotalsProvider } from "@/context/ItemTotalsContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AudioContextProvider } from "@/context/AudioContext";
import { LayoutContent } from "@/components/LayoutContent";
import { Metadata } from "next";
import LayoutProvider from "./LayoutProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | SXNICS",
    default: "SXNICS - Radio stream and episodes",
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
          <LayoutProvider>{children}</LayoutProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
