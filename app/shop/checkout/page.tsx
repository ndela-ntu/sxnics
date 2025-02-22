import CheckoutForm from "@/components/shop/CheckoutForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Checkout",
  description: "Gathering of checkout details, such as personal and shipping details",
  // openGraph: {
  //   title: "About SXNICS",
  //   description: "Learn about our radio station, our mission, and our team",
  //   images: [
  //     {
  //       url: "/images/about-team.jpg", // Replace with your actual image
  //       width: 1200,
  //       height: 630,
  //       alt: "Radio Station Team",
  //     },
  //   ],
  // },
}


export default function Page() {
  return <div className="pb-10"><CheckoutForm /></div>;
}
