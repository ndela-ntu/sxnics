"use client";

import { useEffect, useState } from "react";

export default function TrackList({ tracklist }: { tracklist: string }) {
  const [tracks, setTracks] = useState<string[]>([]);

  useEffect(() => {
    const tracks = tracklist.split(/\d+\.\s/).filter(Boolean);
    setTracks(tracks);
  }, []);

  return (
    <div>
      {tracks.map((track, index) => (
        <div
          key={index}
          className={`p-1 flex items-center space-x-2 ${
            index % 2 === 0 ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <span className="text-lg font-bold">{index + 1}.</span>
          <span className="text-xs">{track}</span>
        </div>
      ))}
    </div>
  );
}
