import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import ViewEpisodePlayer from "@/components/episodes/ViewEpisodePlayer";

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
      <h1 className="py-2">
        <span className="text-base md:text-lg ">{episode.name}</span> by{" "}
        <Link
          className="underline text-base md:text-lg"
          href={`/artists/${episode.artists.id}`}
        >
          {episode.artists.name}
        </Link>
      </h1>
      <ViewEpisodePlayer episode={episode} />
      <p className="py-2 whitespace-pre-wrap ">{episode.description}</p>
    </div>
  );
}
