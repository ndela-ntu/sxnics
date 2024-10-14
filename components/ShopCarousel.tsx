import { IShopItem } from "@/models/ShopItem";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from 'next/image';

export default function ShopCarousel({
  shopItems,
}: {
  shopItems: IShopItem[];
}) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent>
        {shopItems.map((shopItem, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <Card className="bg-black border-2 rounded-none p-0">
                <CardTitle className="text-md text-white py-2 pl-2">
                  {shopItem.name}
                </CardTitle>
                <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                  <div className="w-full h-full">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={shopItem.imageUrl}
                        alt="Image of episode"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}