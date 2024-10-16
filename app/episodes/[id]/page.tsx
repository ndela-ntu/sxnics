import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: episode, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!episode) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row">
      <h1 className='py-2'>
       <span className="italic"> {episode.name}</span> by {" "}
        <Link className="underline" href={`/artists/${episode.artist}`}>
          {episode.artist}
        </Link>
      </h1>
      <div className="relative aspect-square">
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
