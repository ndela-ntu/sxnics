'use client'

import { LayoutContent } from "@/components/LayoutContent";
import { AudioContextProvider } from "@/context/AudioContext";
import { CartProvider } from "@/context/CartContext";
import { ItemTotalsProvider } from "@/context/ItemTotalsContext";

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <ItemTotalsProvider>
        <AudioContextProvider>
          <LayoutContent>{children}</LayoutContent>
        </AudioContextProvider>
      </ItemTotalsProvider>
    </CartProvider>
  );
}
