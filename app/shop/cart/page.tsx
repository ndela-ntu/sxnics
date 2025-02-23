import Cart from "@/components/shop/Cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Cart for choosing the item quantity and finalizing product before checkout",
  openGraph: {
    title: "Cart",
    description: "Cart for choosing the item quantity and finalizing product before checkout",
    images: [
      {
        url: "../LOGO.png", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "SXNICS LOGO",
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="pb-28">
      <h1 className="text-lg">Cart</h1>
      <Cart />
    </div>
  );
}
