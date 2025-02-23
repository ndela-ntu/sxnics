import CheckoutForm from "@/components/shop/CheckoutForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Checkout",
  description: "Gathering of checkout details, such as personal and shipping details",
  openGraph: {
    title: "Checkout",
    description: "Gathering of checkout details, such as personal and shipping details",
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
  return <div className="pb-10"><CheckoutForm /></div>;
}
