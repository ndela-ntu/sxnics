import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Failure",
  description: "When the order has failed this screen is rendered",
  openGraph: {
    title: "Failure",
    description: "When the order has failed this screen is rendered",
    images: [
      {
        url: "../LOGO.png", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "SXNICS LOGO",
      },
    ],
  },
}


export default function Page() {
  return (
    <div className="pb-28">
      <span>Failed to submit transaction. Please try again.</span>
      <Link className="bg-white text-black px-2.5 py-1.5" href="/shop/checkout">
        Checkout
      </Link>
    </div>
  );
}
