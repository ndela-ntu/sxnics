import { supabase } from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const { data: artists, error } = await supabase.from("artists").select("*");

  if (error) {
    return (
      <div className="text-red-500">{`An error occurred: ${error.message}`}</div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2>Artists / Curators</h2>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {artists.map((artist) => (
          <Link href={`/artists/${artist.id}`} key={artist.id} className="flex items-center">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={artist.imageUrl}
                alt="Image of artist"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
