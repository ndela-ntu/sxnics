"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import mongoose from "mongoose";

export default function PreviewClothingItem({
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
  imageUrl: string;
  price: number;
  quantity: number;
}) {
  const { cart, addItem, removeItem } = useCart();

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center border p-5`}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="font-bold md:text-2xl">{name}</h1>
        <p className-="text-sm md:text-md">{description}</p>
      </div>
      <div className="w-full py-8 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="Image of clothing item"
          width={300}
          height={180}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          className="w-[75%] h-auto object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <span className="font-bold">R{price}</span>
        <button
          onClick={() => {
            if (!cart.find((item) => item.id === id)) {
              addItem({ id, name, description, price, imageUrl, quantity });
            } else {
              removeItem(id);
            }
          }}
          className="bg-white text-black px-2 py-1.5 w-1/2"
        >
          {!cart.find((item) => item.id.toString() === id.toString())
            ? "Add To Cart"
            : "Remove From Cart"}
        </button>
      </div>
    </div>
  );
}
