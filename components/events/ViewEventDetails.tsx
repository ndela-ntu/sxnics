import { formatDate } from "@/lib/datetime-formatter";
import { IEvent } from "@/models/Event";
import Image from "next/image";
import Divider from "../Divider";

export default function ViewEventDetails({ event }: { event: IEvent }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-base">Event</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-5">
        <div className="relative aspect-square w-full md:h-1/3 md:w-1/3 lg:h-1/4 lg:w-1/4">
          <Image
            src={event.coverUrl}
            alt="Image of event"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2.5 lg:w-[50%]">
          <div className="flex flex-col">
            <span className="font-bold  md:text-lg">{event.name}</span>
            <span className="lg:mt-0 whitespace-pre-wrap text-sm md:text-base">
              {event.about}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="italic text-sm">
              {formatDate(new Date(event.eventDate))}
            </span>
            <span>{event.location}</span>
          </div>
          {event.ticketLink && <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
            <span className="bg-white text-black px-2.5 py-1">Tickets</span>
          </a>}
        </div>
      </div>
      {event.eventBy === "sxnics" &&
        event.sxnicsEventGallery &&
        event.sxnicsEventGallery?.length > 0 && (
          <div className="w-full h-full">
            <Divider />
            <div className="flex flex-col space-y-2.5">
              <h1 className="text-lg font-bold">Gallery</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {event.sxnicsEventGallery?.map((item, i) => (
                  <div className="border relative aspect-square w-full" key={i}>
                    <Image
                      src={item}
                      alt="Image from event"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
