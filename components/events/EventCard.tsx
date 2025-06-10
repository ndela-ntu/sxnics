import Link from "next/link";
import Image from "next/image";
import { IEvent } from "@/models/Event";
import { formatDate } from "@/lib/datetime-formatter";

export default function EventCard({ event }: { event: IEvent }) {
  return (
    <div className="flex flex-col space-y-2 border">
      <span className="font-bold">{event.name}</span>
      <div className="relative aspect-square">
        <Link href={`/events/${event.id}?type=${event.eventBy}`}>
          <Image
            src={event.coverUrl}
            alt="Image of release"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col text-sm p-1">
        <span>{event.location}</span>
        <span>{formatDate(new Date(event.eventDate))}</span>
      </div>
    </div>
  );
}
