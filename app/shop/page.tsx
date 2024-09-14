import Head from "next/head";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import connectMongo from "@/utils/ConnectMongo";
import ShopItem from "@/models/ShopItem";
import ClothingItem from "@/components/ClothingItem";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Shop: React.FC = async () => {
  await connectMongo();
  const shopItems = await ShopItem.find();

  if (shopItems.length === 0) return <div>No shop items to display</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {shopItems.map((shopItem) => (
        <ClothingItem
          key={shopItem._id.toString()}
          name={shopItem.name}
          description={shopItem.description}
          price={shopItem.price}
          imageURL={shopItem.imageURL}
          quantity={shopItem.quantity}
        />
      ))}
    </div>
  );
};

export default Shop;
