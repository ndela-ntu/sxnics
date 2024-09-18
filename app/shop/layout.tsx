"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cart } = useCart();

  return (
    <div>
      <div>{children}</div>
      
    </div>
  );
}
