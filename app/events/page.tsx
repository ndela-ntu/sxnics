import Divider from "@/components/Divider";
import EventCard from "@/components/events/EventCard";
import EventTabs from "@/components/events/EventTabs";
import { supabase } from "@/utils/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Happening events, your gig guide.",
  openGraph: {
    title: "Events",
    description: "Happening events, your gig guide.",
    images: [
      {
        url: "../LOGO.png", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "SXNICS LOGO",
      },
    ],
  },
};

export const revalidate = 60;

export default async function Page() {
  const { data: events, error } = await supabase
    .from("events")
    .select()
    .abortSignal(AbortSignal.timeout(5000));

  if (error) {
    return <div>{`An error occurred: ${error.message}`}</div>;
  }

  return (
    <div className="h-auto pb-28 w-full">
      <h1 className="text-lg">Events</h1>
      <Divider margin="0" thickness="1" />
      {events.length > 0 ? (
        <EventTabs events={events} />
      ) : (
        <div>No events to show</div>
      )}
    </div>
  );
}
