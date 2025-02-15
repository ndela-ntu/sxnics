"use client";

import { useCart } from "@/context/CartContext";
import { IShopItem } from "@/models/ShopItem";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import placeholderImage from "../../app/placeholder.webp";
import { IShopItemVariant } from "@/models/ShopItemVariant";

export default function ClothingItem({ shopItem }: { shopItem: IShopItem }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      const { data: shopItemVariant, error } = await supabase
        .from("shop_item_variant")
        .select(`*`)
        .eq("shop_item_id", shopItem.id);

      if (error) {
        console.error(error.message);
      }

      if (shopItemVariant && shopItemVariant?.length > 0) {
        setImageUrl(shopItemVariant[0].image_url);
      }
      setLoading(false);
    };

    fetchVariants();
  }, []);

  return (
    <div className="border my-2">
      <div className="relative aspect-square border">
        <Link href={`/shop/${shopItem.id}`}>
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
              src={imageUrl || placeholderImage}
              alt={shopItem.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col p-2.5">
        <span className="font-bold">{shopItem.name}</span>
        <span className="">R{shopItem.price}</span>
      </div>
    </div>
  );
}
