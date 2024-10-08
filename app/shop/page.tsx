import { Montserrat } from "next/font/google";
import Link from "next/link";
import ClothingItem from "@/components/shop/ClothingItem";
import CartButton from "@/components/shop/CartButton";
import { supabase } from "@/utils/supabase";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Shop: React.FC = async () => {
  const { data: shopItems, error } = await supabase
    .from("shop_items")
    .select("*");

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {shopItems.map((shopItem, i) => (
          <ClothingItem
            key={i}
            id={shopItem.id}
            name={shopItem.name}
            description={shopItem.description}
            price={shopItem.price}
            imageUrl={shopItem.imageUrl}
            quantity={shopItem.quantity}
          />
        ))}
      </div>
      <CartButton />
    </div>
  );
};

export default Shop;
