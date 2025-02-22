import { notFound } from "next/navigation";
import PreviewClothingItem from "@/components/shop/PreviewClothingItem";
import CartButton from "@/components/shop/CartButton";
import { supabase } from "@/utils/supabase";
import ShopCarousel from "@/components/ShopCarousel";
import Divider from "@/components/Divider";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data: shopItem, error } = await supabase
    .from("shop_items")
    .select("*")
    .eq("id", parseInt(params.id))
    .single();

  const { data: shopItemVariant } = await supabase
    .from("shop_item_variant")
    .select("*").eq("shop_item_id", parseInt(params.id));

    let imageUrl = "";
  if (shopItemVariant && shopItemVariant.length > 0) {
    imageUrl = shopItemVariant[0].image_url;
  }

  return {
    title: shopItem.name,
    description: shopItem.description,
    openGraph: {
      type: "article",
      title: shopItem.name,
      description: shopItem.description,
      publishedTime: shopItem.created_at,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: shopItem.name,
        },
      ],
    },
  };
}

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
