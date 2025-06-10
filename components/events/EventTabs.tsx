"use client";

import { IEvent } from "@/models/Event";
import EventCard from "./EventCard";
import { useState } from "react";
import Divider from "../Divider";

export default function EventTabs({ events }: { events: IEvent[] }) {
  const [currentTab, setCurrentTab] = useState<"other" | "sxnics">("sxnics");
  const pastEvents = events.filter(
    (event) =>
      event.eventBy === currentTab &&
      new Date(event.eventDate).getTime() < Date.now()
  );

  const newEvents = events.filter(
    (event) =>
      event.eventBy === currentTab &&
      new Date(event.eventDate).getTime() > Date.now()
  );

  return (
    <div className="flex flex-col space-y-2 justify-center items-center w-full h-full">
      <Divider margin="5px 0" />
      <div className="flex space-x-5">
        <span
          onClick={() => setCurrentTab("sxnics")}
          className={`${
            currentTab === "sxnics" && "underline"
          } text-lg md:text-xl font-bold cursor-pointer`}
        >
          Sxnics
        </span>
        <span
          onClick={() => setCurrentTab("other")}
          className={`${
            currentTab === "other" && "underline"
          } text-lg md:text-xl font-bold cursor-pointer`}
        >
          Others
        </span>
      </div>
      {newEvents.length > 0 && (
        <div className="w-full flex flex-col space-y-2.5">
          <span className="font-semibold">New Events</span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2.5">
            {newEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
      {pastEvents.length > 0 && newEvents.length > 0 && <Divider />}
      {pastEvents.length > 0 && (
        <div className="w-full flex flex-col space-y-2.5">
          <span className="font-semibold">Past Events</span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2.5">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
