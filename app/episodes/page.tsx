import EpisodeList from "@/components/episodes/EpisodeList";
import { supabase } from "@/utils/supabase";

export const revalidate = 60;

export default async function Page() {
  const { data: episodes, error } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`)
    .abortSignal(AbortSignal.timeout(5000));

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div className="h-auto">
      <EpisodeList episodes={episodes} />
    </div>
  );
}
