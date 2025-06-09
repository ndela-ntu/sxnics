"use client";

import { IRelease } from "@/models/Release";
import { Card, CardContent, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { IEvent } from "@/models/Event";
import { formatDate } from "@/lib/datetime-formatter";

export default function EventsCarousel({
  initialEvents,
}: {
  initialEvents: IEvent[];
}) {
  const [activeTab, setActiveTab] = useState<"All" | "New" | "Past">("All");
  const [events, setEvents] = useState<IEvent[]>(initialEvents);

  useEffect(() => {
    switch (activeTab) {
      case "All":
        setEvents(initialEvents);
        break;
      case "New":
        setEvents(
          initialEvents.filter(
            (event) => new Date(event.eventDate) >= new Date()
          )
        );
        break;
      case "Past":
        setEvents(
          initialEvents.filter(
            (event) => new Date(event.eventDate) < new Date()
          )
        );
        break;
      default:
        setEvents(initialEvents);
        break;
    }
  }, [activeTab]);

  if (events.length === 0) {
    return (
      <div className="w-full flex items-center">
        <span className="text-sm md:text-base">No events to show</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-2.5 space-y-2.5">
      <div className="text-semibold text-sm lg:text-lg w-full flex items-center justify-center space-x-2.5 lg:space-x-5">
        <button
          onClick={() => setActiveTab("All")}
          className={`${
            activeTab === "All"
              ? "bg-white text-black"
              : "text-white border-b-2"
          } px-2 py-1`}
        >
          All Events
        </button>
        <button
          onClick={() => setActiveTab("New")}
          className={`${
            activeTab === "New"
              ? "bg-white text-black"
              : "text-white border-b-2"
          } px-2 py-1`}
        >
          New Events
        </button>
        <button
          onClick={() => setActiveTab("Past")}
          className={`${
            activeTab === "Past"
              ? "bg-white text-black"
              : "text-white border-b-2"
          } px-2 py-1`}
        >
          Past Events
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-5">
        {events.map((event) => (
          <div key={event.id}>
            <div className="border flex justify-between py-2 px-2 space-x-5">
              <span className="text-xs font-bold truncate">{event.name}</span>
              <span className="text-xs">
                {formatDate(new Date(event.eventDate))}
              </span>
            </div>
            <div className="flex bg-transparent aspect-square items-center justify-center p-0">
              <div className="w-full h-full">
                <div className="aspect-square relative overflow-hidden">
                  <Link href={`events/${event.id}`}>
                    <Image
                      src={event.coverUrl}
                      alt="Image of episode"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                  <span className="flex items-center justify-center text-sm px-1 h-7 absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white">
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
