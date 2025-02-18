"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import { useItemTotals } from "@/context/ItemTotalsContext";

export default function Cart() {
  const { cart, removeItem } = useCart();
  const { itemTotals, addItemTotal, removeItemTotal, clearItemTotals } =
    useItemTotals();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    clearItemTotals();
    cart.forEach((entry) => {
      addItemTotal({ id: entry.variant.id, total: entry.item.price });
    });
  }, []);

  useEffect(() => {
    setTotal(itemTotals.reduce((a, v) => a + v.total, 0));
  }, [itemTotals]);

  const updateTotal = (variantId: number, quantity: number) => {
    const cartItem = cart.find((entry) => entry.variant.id === variantId);

    removeItemTotal(variantId);
    addItemTotal({ id: variantId, total: (cartItem?.item.price || 0) * quantity });
  };

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <span>Cart is currently empty.</span>
        <Link href="/shop" className="bg-white text-black px-4 py-2">
          Shop
        </Link>
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-2.5">
        {cart.map((entry, i) => {
          return (
            <div
              key={i}
              className="flex items-center border justify-start p-1.5 w-full space-x-2.5"
            >
              <div className="relative aspect-square border w-full">
                <Image
                  src={entry.variant.image_url}
                  alt="Image of item"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                  <span className="font-bold">{entry.item.name}</span>
                  <span className="text-sm">{entry.item.description}</span>
                </div>
                <div className="flex flex-col justify-end items-start">
                  <span>R{entry.item.price}</span>
                  <QuantitySelector
                    maxQuantity={entry.variant.quantity}
                    onChangeCB={(value) => {
                      updateTotal(entry.variant.id, value);
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    removeItem(entry.item.id, entry.variant.id);
                    removeItemTotal(entry.variant.id);
                  }}
                  className="bg-white text-black p-3 flex items-center justify-center"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          );
        })}
        <CheckoutButton total={total} />
      </div>
    </div>
  );
}
