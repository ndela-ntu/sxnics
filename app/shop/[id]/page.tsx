import ShopItem from "@/models/ShopItem";
import connectMongo from "@/utils/ConnectMongo";
import { notFound } from "next/navigation";
import PreviewClothingItem from "@/components/shop/PreviewClothingItem";
import CartButton from "@/components/shop/CartButton";

export default async function Page({ params }: { params: { id: string } }) {
  await connectMongo();
  const shopItem = await ShopItem.findById(params.id);

  if (!shopItem) {
    notFound();
  }

  return (
    <div className="">
      <PreviewClothingItem
        id={shopItem._id}
        name={shopItem.name}
        description={shopItem.description}
        imageURL={shopItem.imageURL}
        price={shopItem.price}
        quantity={shopItem.quantityki}
      />
      <CartButton />
    </div>
  );
}
