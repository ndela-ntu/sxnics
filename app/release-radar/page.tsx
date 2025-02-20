import ReleaseCard from "@/components/releases/ReleaseCard";
import { supabase } from "@/utils/supabase";

export const revalidate = 60;

export default async function Page() {
  const { data: releases, error } = await supabase
    .from("releases")
    .select()
    .abortSignal(AbortSignal.timeout(5000));

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div className="pb-28">
      <h1 className="text-lg">Releases</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
  );
}
