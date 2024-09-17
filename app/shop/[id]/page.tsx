import ShopItem from "@/models/ShopItem";
import connectMongo from "@/utils/ConnectMongo";
import { notFound } from "next/navigation";
import PreviewClothingItem from "@/components/shop/PreviewClothingItem";

export default async function Page({ params }: { params: { id: string } }) {
  await connectMongo();
  const shopItem = await ShopItem.findById(params.id);

  if (!shopItem) {
    notFound();
  }

  return (
    <div className="h-full flex items-center justify-center">
      <PreviewClothingItem
        name={shopItem.name}
        description={shopItem.description}
        imageURL={shopItem.imageURL}
        price={shopItem.price}
      />
    </div>
  );
}
