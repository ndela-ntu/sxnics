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
    cart.forEach((cartItem) => {
      addItemTotal({ id: cartItem.id, total: cartItem.price });
    });
  }, []);

  useEffect(() => {
    setTotal(itemTotals.reduce((a, v) => a + v.total, 0));
  }, [itemTotals]);

  const updateTotal = (id: number, quantity: number) => {
    const cartItem = cart.find((cartItem) => cartItem.id === id);

    removeItemTotal(id);
    addItemTotal({ id: id, total: (cartItem?.price || 0) * quantity });
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
      <h1 className="text-lg">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {cart.map((item, i) => {
          return (
            <div
              key={i}
              className="flex items-center border justify-start p-1.5 w-full space-x-5"
            >
              <div className="relative aspect-square border w-full">
                <Image
                  src={item.imageUrl}
                  alt="Image of item"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-sm">{item.description}</span>
                </div>
                <div className="flex flex-col justify-end items-start">
                  <span>R{item.price}</span>
                  <QuantitySelector
                    maxQuantity={item.quantity}
                    onChangeCB={(value) => {
                      updateTotal(item.id, value);
                    }}
                  />
                </div>
                <button
                  onClick={() => removeItem(item.id)}
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
