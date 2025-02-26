import { Montserrat } from "next/font/google";
import Link from "next/link";
import ClothingItem from "@/components/shop/ClothingItem";
import CartButton from "@/components/shop/CartButton";
import { supabase } from "@/utils/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store/shop",
  description: "Tees, hoodies and more. Artworks from various artists",
  openGraph: {
    title: "Store/shop",
    description: "Tees, hoodies and more. Artworks from various artists",
    images: [
      {
        url: "../LOGO.png", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "SXNICS LOGO",
      },
    ],
  },
};

export const revalidate = 60;

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Shop: React.FC = async () => {
  const { data: shopItems, error } = await supabase
    .from("shop_items")
    .select("*")
    .abortSignal(AbortSignal.timeout(5000));

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div className="pb-28">
      <h1 className="text-lg">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {shopItems.map((shopItem, i) => (
          <ClothingItem key={i} shopItem={shopItem} />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Shop;
