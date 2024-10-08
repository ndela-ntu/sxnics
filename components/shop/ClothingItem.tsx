"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

export default function ClothingItem({
  id,
  name,
  description,
  price,
  imageUrl,
  quantity,
}: {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}) {
  const { cart, removeItem } = useCart();
  return (
    <div className="m-2.5 border">
      <div className="relative aspect-square border">
        <Link href={`/shop/${id}`}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center p-2.5">
        <div className="flex flex-col ">
          <span className="font-bold">{name}</span>
          {quantity !== 0 ? <span>R{price}</span> : <span>Out of stock</span>}
        </div>
        {cart.find((cartItem) => cartItem.id === id) && (
          <div>
            <button
              onClick={() => {
                removeItem(id)
              }}
              className="bg-white text-black p-3 rounded-full flex items-center justify-center"
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
