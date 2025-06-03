import { supabase } from "@/utils/supabase";

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
          <div key={artist.id}></div>
        ))}
      </div>
    </div>
  );
}
