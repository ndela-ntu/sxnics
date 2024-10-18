import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col w-full h-full">
      <h1 className="py-2">
        <span className="italic text-base md:text-lg "> {episode.name}</span> by{" "}
        <Link className="underline text-base md:text-lg" href={`/artists/${episode.artists.id}`}>
          {episode.artists.name}
        </Link>
      </h1>
      <div className="relative aspect-square md:h-1/2 md:w-1/2 lg:h-1/3 lg:w-1/3">
        <Image
          src={episode.imageUrl}
          alt="Image of episode"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <p className="py-2 whitespace-pre-wrap ">{episode.description}</p>
    </div>
  );
}
