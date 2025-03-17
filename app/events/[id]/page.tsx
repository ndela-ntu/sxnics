import ViewEventDetails from "@/components/events/ViewEventDetails";
import { supabase } from "@/utils/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data: event, error } = await supabase
    .from("events")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: event.name,
    description: event.about,
    openGraph: {
      type: "article",
      title: event.name,
      description: event.about,
      publishedTime: event.created_at,
      images: [
        {
          url: event.coverUrl,
          width: 1200,
          height: 630,
          alt: event.name,
        },
      ],
    },
  };
}

export const revalidate = 60;
export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type?: string };
}) {
  const type = searchParams.type || "sxnics";

  const { data: event, error } = await supabase
    .from("events")
    .select()
    .eq("id", params.id)
    .single();

  if (!event) {
    notFound();
  }

  return (
    <div className="pb-28">
      <ViewEventDetails event={event} />
    </div>
  );
}
