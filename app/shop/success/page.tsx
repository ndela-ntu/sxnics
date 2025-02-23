import Success from "@/components/shop/Success";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Success",
  description: "When the order has succeeded this screen is rendered",
  openGraph: {
    title: "Success",
    description: "When the order has succeeded this screen is rendered",
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
    <Success />
  );
}
