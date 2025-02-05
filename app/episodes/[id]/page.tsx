import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import ViewEpisodePlayer from "@/components/episodes/ViewEpisodePlayer";
import ShareButton from "@/components/episodes/ShareButton";
import TrackList from "@/components/episodes/TrackList";
import { Link as LucideLink } from "lucide-react";
import EpisodeList from "@/components/episodes/EpisodeList";
import LikeButton from "@/components/episodes/LikeButton";

export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  const { data: episode, error: singleEpisodeError } = await supabase
    .from("episodes")
    .select(`*, artists (id, name), episode_likes(count)`)
    .eq("id", params.id)
    .single();

  const { data: episodes, error: episodesError } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`)
    .limit(5);

  if (episodesError || singleEpisodeError) {
    return (
      <div>{`An error occurred: ${
        episodesError?.message || singleEpisodeError?.message
      }`}</div>
    );
  }

  if (!episode) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen pb-28">
      <div className="flex justify-between items-center">
        <h1 className="py-2 flex items-center space-x-1 flex-wrap">
          <span className="text-base md:text-lg ">{episode.name}</span>
          <span>by</span>
          <Link
            className="flex items-center space-x-1 underline text-base md:text-lg"
            href={`/artists/${episode.artists.id}`}
          >
            <span> {episode.artists.name}</span>
            <span>
              <LucideLink className="h-4 w-4" />
            </span>
          </Link>
        </h1>
        <ShareButton
          mixTitle={episode.name}
          artistName={episode.artists.name}
          mixUrl={`https://sxnics.com/episodes/${episode.id}`}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <ViewEpisodePlayer episode={episode} />
        <div className="mb-5 flex flex-col space-y-1 pt-2 w-full">
          <div className="flex justify-between w-full">
            <span className="font-bold underline">Tracklist</span>
            {/* <span>
              <LikeButton
                mixId={episode.id}
                initialLikeCount={episode.episode_likes[0]?.count || 0}
              />
            </span> */}
          </div>
          <div className="border border-white">
            <TrackList tracklist={episode.description} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">More Episodes</span>
        <EpisodeList episodes={episodes.filter((ep) => ep.id !== episode.id)} />
      </div>
    </div>
  );
}
