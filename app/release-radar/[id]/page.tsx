import ViewRelease from "@/components/releases/ViewRelease";
import { supabase } from "@/utils/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: release, error } = await supabase
    .from("releases")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: release.name,
    description: release.about,
    openGraph: {
      type: "article",
      title: release.name,
      description: release.about,
      publishedTime: release.created_at,
      images: [
        {
          url: release.imageUrl,
          width: 1200,
          height: 630,
          alt: release.name,
        },
      ],
    },
  }
}


export default async function Page({ params }: { params: { id: string } }) {
  const { data: release, error } = await supabase
    .from("releases")
    .select()
    .eq("id", params.id)
    .single();

  if (!release) {
    notFound();
  }

  return <div className="pb-28 w-full"><ViewRelease release={release} /></div>;
}
