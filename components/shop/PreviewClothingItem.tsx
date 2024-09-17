import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function PreviewClothingItem({
  name,
  description,
  price,
  imageURL,
}: {
  name: string;
  description: string;
  imageURL: string;
  price: number;
}) {
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
          src={imageURL}
          alt="Image of clothing item"
          width={300}
          height={180}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          className="w-[75%] h-auto object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <span className="font-bold">R{price}</span>
        <AddToCartButton />
      </div>
    </div>
  );
}
