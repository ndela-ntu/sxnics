import { IShopItem } from "@/models/ShopItem";
import { CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import placeholderImage from "../../app/placeholder.webp";
import { IShopItemVariant } from "@/models/ShopItemVariant";

export default function CarouselShopItem({ shopItem }: { shopItem: IShopItem }) {
  const [loading, setLoading] = useState<boolean>(false);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [hashColors, setHashColors] = useState<string[]>([]);
  const [itemIndex, setItemIndex] = useState<number>(0);

  useEffect(() => {
    let imageUrls: string[] = [];
    let hashColors: string[] = [];

    const fetchVariants = async () => {
      setLoading(true);
      const { data: shopItemVariants, error } = await supabase
        .from("shop_item_variant")
        .select(`*, color(id, name, hash_color)`)
        .eq("shop_item_id", shopItem.id);

      if (error) {
        console.error(error.message);
      }

      shopItemVariants?.forEach((variant) => {
        if (!imageUrls.includes(variant.image_url)) {
          imageUrls.push(variant.image_url);
          hashColors.push(variant.color.hash_color);
        }
      });

      setImageUrls(imageUrls);
      setHashColors(hashColors);
      setLoading(false);
    };

    fetchVariants();
  }, []);

  return (
    <div>
      <CardTitle className="text-sm py-2 px-2 font-normal">
        {shopItem.name}
      </CardTitle>
      <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
        <div className="w-full h-full">
          <div className="aspect-square relative overflow-hidden">
            {loading ? (
              <Image
                src={placeholderImage}
                alt="Loading..."
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <Image
                src={imageUrls[itemIndex] || placeholderImage}
                alt={shopItem.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
}
