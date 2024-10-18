import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import SocialLink from "@/components/SocialLink";

export default async function Page({ params }: { params: { id: number } }) {
  const { data: artist, error } = await supabase
    .from("artists")
    .select()
    .eq("id", params.id)
    .single();

  if (!artist) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="relative aspect-square md:h-1/2 md:w-1/2 lg:h-1/3 lg:w-1/3">
        <Image
          src={artist.imageUrl}
          alt="Image of episode"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base md:text-large">{artist.name}</span>
        <span className="text-xs md:text-sm">{artist.bio}</span>
      </div>
      <div className="flex space-x-2.5">
        <SocialLink to="instagram" username={artist.socialLinks["instagram"]} />
        <SocialLink to="x" username={artist.socialLinks["x"]} />
      </div>
    </div>
  );
}
