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
      <div className="w-full">
        <Image
          src={imageURL}
          alt="Image of clothing item"
          width={300}
          height={180}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col p-2.5">
        <span className="font-bold">{name}</span>
        {quantity !== 0 ? <span>R{price}</span> : <span>Out of stock</span>}
      </div>
    </div>
  );
}
