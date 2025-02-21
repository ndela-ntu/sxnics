import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our radio station, our mission, and our team",
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
    <div className="flex flex-col items-center justify-center min-h-screen text-center w-full">
      <p className="lg:w-1/2">
        Your underground music stop. Founded in 2024 and based in Freedom Park,
        Soweto, SXNICS is dedicated to bringing you the freshest underground
        tunes. We showcase a wide range of genres, including deep house, lounge,
        ambient, and more, with carefully selected weekly releases curated by
        our passionate music experts. Alongside these unique tracks, we feature
        exclusive DJ episodes and occasional interviews with artists who are
        making waves in the scenes. As we grow, we aim to expand our library to
        include licensed music, funded through our online store and monthly
        subscription plans, ensuring you continue to enjoy the best music,
        legally and uninterrupted.
      </p>
    </div>
  );
}
