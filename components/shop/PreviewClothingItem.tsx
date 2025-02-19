"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { IShopItem } from "@/models/ShopItem";
import { useEffect, useState } from "react";
import { IShopItemVariant } from "@/models/ShopItemVariant";
import { supabase } from "@/utils/supabase";
import placeholderImage from "../../app/placeholder.webp";
import { ShoppingCart, Trash } from "lucide-react";
import Divider from "../Divider";

type PreviewVariant = {
  imageUrls: string[];
  colors: { id: number; name: string; hash_color: string }[];
  sizes: { id: number; name: string }[];
};

export default function PreviewClothingItem({
  shopItem,
}: {
  shopItem: IShopItem;
}) {
  const { cart, addItem, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  const [previewVariants, setPreviewVariants] = useState<PreviewVariant | null>(
    null
  );

  const [itemIndex, setItemIndex] = useState<number>(0);
  const [variants, setVariants] = useState<IShopItemVariant[]>([]);
  const [currentVariant, setCurrentVariant] = useState<IShopItemVariant>();

  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);

  useEffect(() => {
    let imageUrls: string[] = [];
    let colors: { id: number; name: string; hash_color: string }[] = [];
    let sizes: { id: number; name: string }[] = [];

    const fetchVariants = async () => {
      setLoading(true);
      const { data: shopItemVariants, error } = await supabase
        .from("shop_item_variant")
        .select(`*, color(id, name, hash_color), size(id, name)`)
        .eq("shop_item_id", shopItem.id);

      if (error) {
        console.log(error.message);
      }

      shopItemVariants?.forEach((variant) => {
        if (!imageUrls.includes(variant.image_url)) {
          imageUrls.push(variant.image_url);
          colors.push(variant.color);
        }
      });

      shopItemVariants?.forEach((variant) => {
        if (!sizes.find((size) => size.id === variant.size.id)) {
          sizes.push(variant.size);
        }
      });

      const sortedSizes = sizes.sort((a, b) => a.id - b.id);

      setVariants(shopItemVariants ?? []);
      setPreviewVariants({ imageUrls, colors, sizes: sortedSizes });
      setSelectedColor(colors[0].id);

      setLoading(false);
    };

    fetchVariants();
  }, []);

  useEffect(() => {
    setCurrentVariant(
      variants.find(
        (variant) =>
          variant.color.id === selectedColor && variant.size.id === selectedSize
      )
    );
  }, [selectedSize, selectedColor]);

  return (
    <div
      className={`flex flex-col md:flex-row md:max-w-[50%] md:space-x-5 md:items-start items-center justify-center border p-1.5`}
    >
      <div className="aspect-square relative overflow-hidden w-full h-full">
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
            src={previewVariants?.imageUrls[itemIndex] ?? placeholderImage}
            alt={shopItem.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-col w-full h-full items-center">
        <Divider margin="8px 0" className="md:hidden" />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl md:text-2xl">{shopItem.name}</h1>
            <span className="font-semibold text-lg md:text-xl underline">
              R{shopItem.price}
            </span>
          </div>
          <p className="text-sm md:text-md">{shopItem.description}</p>
        </div>
        <Divider margin="8px 0" />
        <div className="flex flex-wrap items-center space-x-2">
          {previewVariants?.colors.map((color, index) => (
            <div
              onClick={() => {
                setItemIndex(index);
                setSelectedColor(color.id);
              }}
              key={index}
              className={`${
                index === itemIndex
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              } flex border p-1 items-center space-x-1.5`}
            >
              <span
                className="border-2 w-5 h-5 rounded-full relative flex items-center justify-center"
                style={{ backgroundColor: color.hash_color }}
              >
                {index === itemIndex && (
                  <svg
                    className={`w-4 h-4 ${
                      color.hash_color === "#000000"
                        ? "text-white"
                        : "text-black"
                    } absolute`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              <span>
                {color.name.charAt(0).toUpperCase() +
                  color.name.slice(1).toLowerCase()}
              </span>
            </div>
          ))}
        </div>
        <Divider margin="8px 0" />
        <div className="flex flex-wrap space-x-1">
          {previewVariants?.sizes.map((size) => {
            const currVariant = variants.find(
              (variant) =>
                variant.size.id === size.id &&
                variant.color.id === selectedColor
            );

            if (currVariant && currVariant.quantity > 0) {
              return (
                <button
                  onClick={() => {
                    setSelectedSize(size.id);
                  }}
                  key={size.id}
                  className={`px-3 py-1 ${
                    selectedSize === size.id
                      ? "bg-white text-black"
                      : "bg-transparent text-white border"
                  }`}
                >
                  {size.name}
                </button>
              );
            } else {
              return (
                <button
                  disabled
                  key={size.id}
                  className="px-3 py-1 bg-gray-500 text-white opacity-45"
                >
                  {size.name}
                </button>
              );
            }
          })}
        </div>
        <Divider margin="8px 0" />
        <div
          className="tooltip tooltip-bottom w-full"
          data-tip={!selectedSize ? "Please select a size first" : null}
        >
          <button
            onClick={() => {
              if (selectedSize && currentVariant) {
                const cartItem = cart.find(
                  (entry) =>
                    entry.item.id === shopItem.id &&
                    entry.variant.id === currentVariant.id
                );

                if (cartItem) {
                  removeItem(shopItem.id, currentVariant.id);
                } else {
                  addItem(shopItem, currentVariant);
                }
              }
            }}
            className="bg-white text-black px-2 py-1.5 w-1/2"
          >
            {currentVariant &&
            cart.find(
              (entry) =>
                entry.item.id === shopItem.id &&
                entry.variant.id === currentVariant.id
            ) ? (
              <div className="flex space-x-2.5 w-full items-center justify-center">
                <span>Remove From Cart</span>
                <span>
                  <Trash />
                </span>
              </div>
            ) : (
              <div className="flex space-x-2.5 w-full items-center justify-center">
                <span>Add To Cart</span>
                <span>
                  <ShoppingCart />
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
