import Success from "@/components/shop/Success";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Success",
  description: "When the order has succeeded this screen is rendered",
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
  return (
    <Success />
  );
}
