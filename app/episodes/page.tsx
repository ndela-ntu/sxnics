import EpisodeList from "@/components/episodes/EpisodeList";
import { mergeEpisodes } from "@/lib/merge-episodes";
import { supabase } from "@/utils/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Episode List",
  description:
    "Listen/stream our episodes from various guests and resident djs",
  openGraph: {
    title: "Episodes",
    description:
      "Listen/stream our episodes from various guests and resident djs",
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

export const revalidate = 60;

export default async function Page() {
  const { data: audioEpisodes, error: audioEpisodesError } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`)
    .order("id", { ascending: false });

  const { data: videoEpisodes, error: videoEpisodesError } = await supabase
    .from("video_episodes")
    .select(`*, artists(id, name)`);

  if (audioEpisodesError || videoEpisodesError) {
    return (
      <div>{`An error occurred: ${
        audioEpisodesError?.message || videoEpisodesError?.message
      }`}</div>
    );
  }

  const episodes = mergeEpisodes(videoEpisodes, audioEpisodes);

  return (
    <div className="h-auto pb-28">
      <h1 className="text-lg">Episodes</h1>
      <EpisodeList episodes={episodes} />
    </div>
  );
}
