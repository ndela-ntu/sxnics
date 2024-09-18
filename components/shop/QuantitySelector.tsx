"use client";

import { useEffect, useState } from "react";

export default function QuantitySelector({
  maxQuantity,
  onChangeCB,
}: {
  maxQuantity: number;
  onChangeCB: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    onChangeCB(quantity);
  }, [quantity])

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        className="border font-bold px-3"
        onClick={decrementQuantity}
      >
        -
      </button>
      <span className="">{quantity}</span>
      <button
        className="border font-bold px-3"
        onClick={incrementQuantity}
      >
        +
      </button>
    </div>
  );
}
