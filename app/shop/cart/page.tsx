"use client";

import { useCart } from "@/context/CartContext";
import Image from 'next/image';

export default function Page() {
  const { cart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-lg">Cart</h1>
      {cart.map((item) => (
        <div className="flex items-center border justify-start p-1.5">
          <div className="w-full py-8 flex items-center justify-center">
            <Image
              src={item.imageURL}
              alt="Image of clothing item"
              width={300}
              height={180}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              className="w-[75%] h-auto object-cover"
            />
          </div>
          <div className="flex flex-col border h-full">
            <span className="font-bold">{item.name}</span>
            <span className="text-sm">{item.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
