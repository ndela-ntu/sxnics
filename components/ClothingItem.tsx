import Image from "next/image";

export default function ClothingItem({
  name,
  description,
  price,
  imageURL,
  quantity,
}: {
  name: string;
  description: string;
  price: number;
  imageURL: string;
  quantity: number;
}) {
  return (
    <div className="m-2.5 border">
      <div className="aspect-square relative">
        <Image
          src={imageURL}
          alt="Image of product"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col p-2.5">
        <span className="font-bold">{name}</span>
        {quantity !== 0 ? <span>R{price}</span> : <span>Out of stock</span>}
      </div>
    </div>
  );
}
