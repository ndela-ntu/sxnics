import ViewRelease from "@/components/releases/ViewRelease";
import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import { release } from "os";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: release, error } = await supabase
    .from("releases")
    .select()
    .eq("id", params.id)
    .single();

  if (!release) {
    notFound();
  }

  return <div className="pb-28"><ViewRelease release={release} /></div>;
}
