import EpisodeList from "@/components/episodes/EpisodeList";
import { supabase } from "@/utils/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Episode List",
  description: "Listen/stream our episodes from various guest and resident djs",
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

export const revalidate = 60;

export default async function Page() {
  const { data: episodes, error } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`)
    .order("id", { ascending: false });

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div className="h-auto pb-28">
      <h1 className="text-lg">Episodes</h1>
      <EpisodeList episodes={episodes} />
    </div>
  );
}
