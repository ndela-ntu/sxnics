import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import ViewEpisodePlayer from "@/components/episodes/ViewEpisodePlayer";
import ShareButton from "@/components/episodes/ShareButton";
import TrackList from "@/components/episodes/TrackList";

export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  const { data: episode, error } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`)
    .eq("id", params.id)
    .single();

  if (!episode) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="py-2 flex items-center space-x-1 flex-wrap">
          <span className="text-base md:text-lg ">{episode.name}</span>
          <span>by</span>
          <Link
            className="underline text-base md:text-lg"
            href={`/artists/${episode.artists.id}`}
          >
            {episode.artists.name}
          </Link>
        </h1>
        <ShareButton
          mixTitle={episode.name}
          artistName={episode.artists.name}
          mixUrl={`https://sxnics.com/episodes/${episode.id}`}
        />
      </div>
      <ViewEpisodePlayer episode={episode} />
      <div className="mb-5 flex flex-col space-y-1 pt-2">
        <span className="font-bold underline">Tracklist</span>
        <div className="border border-white">
          <TrackList tracklist={episode.description} />
        </div>
      </div>
    </div>
  );
}
