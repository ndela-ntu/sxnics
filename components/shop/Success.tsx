"use client";

import { useCart } from "@/context/CartContext";
import { useItemTotals } from "@/context/ItemTotalsContext";
import Link from "next/link";
import { useEffect } from "react";

export default function Success() {
  const { clearCart } = useCart();
  const { clearItemTotals } = useItemTotals();

  useEffect(() => {
    clearCart();
    clearItemTotals();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span>Success, your order has been placed</span>
      <Link className="bg-white text-black px-2.5 py-1.5" href="/shop">
        Continue Shopping
      </Link>
    </div>
  );
}
