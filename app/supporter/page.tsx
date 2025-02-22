import PayPalButton from "@/components/PayPalButton";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Become a supporter",
  description: "Subscription via paypal to help support the platform",
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
    <div className="min-h-screen pb-28 flex flex-col space-y-5 items-center justify-center">
      <p className="text-center lg:w-1/2">
        Become a supporter of sxnics, our online radio platform, and help us
        improve by funding better equipment and acquiring music licenses from
        across the globe. Your support allows us to deliver high-quality sound
        and diverse music from international artists, enhancing your listening
        experience.
      </p>
      <PayPalButton />
    </div>
  );
}
