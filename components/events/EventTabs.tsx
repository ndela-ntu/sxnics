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
      <Divider margin="5px 0"/>
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
        <div className="w-full">
          <span>New Events</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {newEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
      {pastEvents.length > 0 && (
        <div className="w-full">
          <span>Past Events</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
