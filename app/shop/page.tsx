import { Montserrat } from "next/font/google";
import Link from "next/link";
import connectMongo from "@/utils/ConnectMongo";
import ShopItem from "@/models/ShopItem";
import ClothingItem from "@/components/shop/ClothingItem";
import { FC } from "react";
import { useCart } from "@/context/CartContext";
import CartButton from "@/components/shop/CartButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Shop: React.FC = async () => {
  await connectMongo();
  const shopItems = await ShopItem.find();

  if (shopItems.length === 0) return <div>No shop items to display</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {shopItems.map((shopItem, i) => (
          <Link key={i} href={`/shop/${shopItem._id.toString()}`}>
            <ClothingItem
              id={shopItem.id.toString()}
              name={shopItem.name}
              description={shopItem.description}
              price={shopItem.price}
              imageURL={shopItem.imageURL}
              quantity={shopItem.quantity}
            />
          </Link>
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Shop;
