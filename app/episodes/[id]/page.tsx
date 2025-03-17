import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation"; // ✅ Correct import
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import ViewEpisodePlayer from "@/components/episodes/ViewEpisodePlayer";
import ShareButton from "@/components/episodes/ShareButton";
import TrackList from "@/components/episodes/TrackList";
import { Link as LucideLink } from "lucide-react";
import EpisodeList from "@/components/episodes/EpisodeList";
import { Metadata } from "next";
import { mergeEpisodes } from "@/lib/merge-episodes";
import { IVideoEpisode } from "@/models/VideoEpisode";
import { IEpisode, isIEpisode } from "@/models/Episode";
import { IMergedEpisode } from "@/models/MergedEpisode";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch the episode based on the type (audio or video)
  const { data: episode, error } = await supabase
    .from("episodes") // Default to "episodes" table
    .select(`*, artists (id, name)`)
    .eq("id", params.id)
    .single();

  // If not found in "episodes", try the "video_episodes" table
  if (!episode) {
    const { data: videoEpisode, error: videoError } = await supabase
      .from("video_episodes")
      .select(`*, artists (id, name)`)
      .eq("id", params.id)
      .single();

    if (!videoEpisode) return notFound(); // If not found in either table, return notFound

    // Use the video episode for metadata
    return {
      title: videoEpisode.name,
      description: videoEpisode.description,
      openGraph: {
        type: "article",
        title: videoEpisode.name,
        description: videoEpisode.description,
        publishedTime: videoEpisode.created_at,
        images: [
          {
            url: videoEpisode.imageUrl,
            width: 1200,
            height: 630,
            alt: videoEpisode.name,
          },
        ],
      },
    };
  }

  // Use the audio episode for metadata
  return {
    title: episode.name,
    description: episode.description,
    openGraph: {
      type: "article",
      title: episode.name,
      description: episode.description,
      publishedTime: episode.created_at,
      images: [
        {
          url: episode.imageUrl,
          width: 1200,
          height: 630,
          alt: episode.name,
        },
      ],
    },
  };
}

export const revalidate = 60;
export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type?: string };
}) {
  const type = searchParams.type || "audio";

  const [
    { data: singleEpisode, error: episodeError },
    { data: audioEpisodes, error: audioEpisodesError },
    { data: videoEpisodes, error: videoEpisodesError },
  ] = await Promise.all([
    supabase
      .from(type === "audio" ? "episodes" : "video_episodes")
      .select(`*, artists (id, name)`)
      .eq("id", params.id) // Ensure this matches the type in your database
      .single(),
    supabase
      .from("episodes")
      .select(`*, artists (id, name)`)
      .limit(5)
      .order("id", { ascending: false }),
    supabase
      .from("video_episodes")
      .select(`*, artists (id, name)`)
      .limit(5)
      .order("id", { ascending: false }),
  ]);

  if (episodeError) {
    console.error("Episode Error:", episodeError);
    return notFound();
  }

  if (!singleEpisode) {
    console.error("No episode found with id:", params.id);
    return notFound();
  }

  if (audioEpisodesError || videoEpisodesError) {
    return (
      <div>{`An error occurred: ${
        audioEpisodesError?.message || videoEpisodesError?.message
      }`}</div>
    );
  }

  const episodes = mergeEpisodes(videoEpisodes, audioEpisodes);
  const episode: IMergedEpisode = {
    ...singleEpisode,
    type: isIEpisode(singleEpisode) ? "audio" : "video",
    mediaUrl: isIEpisode(singleEpisode)
      ? singleEpisode.audioUrl
      : singleEpisode.videoUrl,
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen pb-28 space-y-2.5 lg:space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="py-2 flex items-center space-x-1 flex-wrap">
          <span className="text-base md:text-lg ">{episode.name}</span>
          <span>by</span>
          <Link
            className="flex items-center space-x-1 underline text-base md:text-lg"
            href={`/artists/${episode.artists.id}`}
          >
            <span> {episode.artists.name}</span>
            <LucideLink className="h-4 w-4" />
          </Link>
        </h1>
        <ShareButton
          mixTitle={episode.name}
          artistName={episode.artists.name}
          mixUrl={`https://sxnics.com/episodes/${episode.id}?type=${episode.type === 'audio' ? 'audio' : 'video'}`}
        />
      </div>
      <div className="flex flex-col lg:justify-center lg:items-center lg:flex-row lg:space-x-10 w-full">
        <ViewEpisodePlayer episode={episode} />
        <div className="mb-5 flex flex-col space-y-1 pt-2 w-full">
          <div className="flex justify-between w-full">
            <span className="font-bold underline">Tracklist</span>
          </div>
          <TrackList tracklist={episode.description} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">More Episodes</span>
        <EpisodeList episodes={episodes.filter((ep) => ep.id !== episode.id)} />
      </div>
    </div>
  );
}
