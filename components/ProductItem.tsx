import Product from "@/models/Product";
import Image from "next/image";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="m-2.5 border">
      <div key={product.id} className="aspect-square relative">
        <Image
          src={product.imageURL}
          alt="Image of product"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col p-2.5">
        <span className="font-bold">{product.name}</span>
        <span>R{product.price}</span>
      </div>
    </div>
  );
}
