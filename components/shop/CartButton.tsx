'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

export default function CartButton() {
  const { cart } = useCart();

  if (cart.length === 0) return <div></div>;

  return (
    <Link
      href="/shop/cart"
      className="fixed flex items-center space-x-2.5 bottom-6 right-6 bg-white text-black  font-bold py-1 px-2.5"
    >
      <span>{cart.length}</span>
      <span>Cart</span>
      <span>
        <CiShoppingCart />
      </span>
    </Link>
  );
}
