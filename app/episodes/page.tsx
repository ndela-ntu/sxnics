import EpisodeList from "@/components/episodes/EpisodeList";
import { supabase } from "@/utils/supabase";

export const revalidate = 60;

export default async function Page() {
  const { data: episodes, error } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`);

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div className="h-auto pb-28">
      <h1 className="text-lg">Episodes</h1>
      <EpisodeList episodes={episodes} />
    </div>
  );
}
