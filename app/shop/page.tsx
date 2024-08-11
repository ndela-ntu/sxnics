import Head from "next/head";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import Product from "@/models/Product";
import ProductItem from "@/components/ProductItem";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Shop: React.FC = () => {
  return (
    <main className={`bg-black h-screen text-white ${montserrat.className}`}>
      <h1 className={` text-5xl p-5`}>SXNICS</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dummyProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Black T-shirt",
    price: 250,
    imageURL: "/images/TShirt-1.webp",
  },
  {
    id: "1",
    name: "Black T-shirt",
    price: 250,
    imageURL: "/images/TShirt-2.webp",
  },
  {
    id: "1",
    name: "Black T-shirt",
    price: 250,
    imageURL: "/images/TShirt-3.webp",
  },
  {
    id: "1",
    name: "Black T-shirt",
    price: 250,
    imageURL: "/images/TShirt-4.webp",
  },
  {
    id: "1",
    name: "Black T-shirt",
    price: 250,
    imageURL: "/images/TShirt-5.webp",
  },
  {
    id: "1",
    name: "Black T-shirt",
    price: 250,
    imageURL: "/images/TShirt-6.webp",
  },
];

export default Shop;
