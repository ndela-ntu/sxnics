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
      <h1 className="text-lg">Item Preview</h1>
      <PreviewClothingItem shopItem={shopItem} />
      <CartButton />
    </div>
  );
}
