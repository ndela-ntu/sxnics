import { notFound } from "next/navigation";
import PreviewClothingItem from "@/components/shop/PreviewClothingItem";
import CartButton from "@/components/shop/CartButton";
import { supabase } from "@/utils/supabase";
import ShopCarousel from "@/components/ShopCarousel";
import Divider from "@/components/Divider";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: shopItem, error } = await supabase
    .from("shop_items")
    .select("*")
    .eq("id", parseInt(params.id))
    .single();

  const { data: shopItems, error: shopItemsError } = await supabase
    .from("shop_items")
    .select("*")
    .eq("item_type_id", shopItem.item_type_id);

  if (shopItemsError) {
    return <div>{`An error occurred: ${shopItemsError.message}`}</div>;
  }

  if (!shopItem) {
    notFound();
  }

  return (
    <div className="pb-28">
      <h1 className="text-lg">Item Preview</h1>
      <PreviewClothingItem shopItem={shopItem} />
      <Divider />
      <div className="flex flex-col">
        <h1 className="text-lg">More Similar Items</h1>
        <ShopCarousel
          shopItems={shopItems.filter((item) => item.id !== shopItem.id)}
        />
        <CartButton />
      </div>
    </div>
  );
}
