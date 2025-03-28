import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import SocialLink from "@/components/SocialLink";
import EpisodeList from "@/components/episodes/EpisodeList";
import Divider from "@/components/Divider";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: artist, error: artistError } = await supabase
    .from("artists")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: artist.name,
    description: artist.bio,
    openGraph: {
      type: "article",
      title: artist.name,
      description: artist.bio,
      publishedTime: artist.created_at,
      images: [
        {
          url: artist.imageUrl,
          width: 1200,
          height: 630,
          alt: artist.name,
        },
      ],
    },
  }
}

export const revalidate = 60;

export default async function Page({ params }: { params: { id: number } }) {
  const { data: artist, error: artistError } = await supabase
    .from("artists")
    .select()
    .eq("id", params.id)
    .single();

  const { data: episodes, error: episodeError } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`)
    .eq("artistId", params.id);

  if (artistError || episodeError) {
    return <div>{`An error occurred: ${episodeError || artistError}`}</div>;
  }

  if (!artist) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-2.5 pb-28">
      <h1 className="text-lg">Artist Bio</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-5">
        <div className="relative aspect-square md:h-1/3 md:w-1/3 lg:h-1/4 lg:w-1/4">
          <Image
            src={artist.imageUrl}
            alt="Image of episode"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col lg:w-1/2">
          <span className="text-large md:text-xl font-bold">{artist.name}</span>
          <span className="text-xs lg:text-sm">{artist.bio}</span>
        </div>
      </div>
      <div className="flex space-x-2.5">
        <SocialLink to="instagram" username={artist.socialLinks["instagram"]} />
        <SocialLink to="x" username={artist.socialLinks["x"]} />
      </div>
      <Divider margin="1" />
      <div>
        <span>Appears on</span>
        <div className="flex flex-col">
          <EpisodeList episodes={episodes} />
        </div>
      </div>
    </div>
  );
}
