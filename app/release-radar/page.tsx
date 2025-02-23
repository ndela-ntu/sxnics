import ReleaseCard from "@/components/releases/ReleaseCard";
import { supabase } from "@/utils/supabase";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Releases",
  description: "Picked latest releases from the underground scene",
  openGraph: {
    title: "Releases",
    description: "Picked latest releases from the underground scene",
    images: [
      {
        url: '../LOGO.png', // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "SXNICS LOGO",
      },
    ],
  },
}

export const revalidate = 60;

export default async function Page() {
  const { data: releases, error } = await supabase
    .from("releases")
    .select()
    .abortSignal(AbortSignal.timeout(5000));

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div className="pb-28">
      <h1 className="text-lg">Releases</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
  );
}
