import { notFound } from "next/navigation";
import PreviewClothingItem from "@/components/shop/PreviewClothingItem";
import CartButton from "@/components/shop/CartButton";
import { supabase } from "@/utils/supabase";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: shopItem, error } = await supabase
    .from("shop_items")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!shopItem) {
    notFound();
  }

  return (
    <div className="pb-28">
      <PreviewClothingItem
        id={shopItem.id}
        name={shopItem.name}
        description={shopItem.description}
        imageUrl={shopItem.imageUrl}
        price={shopItem.price}
        quantity={shopItem.quantity}
      />
      <CartButton />
    </div>
  );
}
