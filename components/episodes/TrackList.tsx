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
          className={`p-1 max-w-fit flex items-center space-x-2 border`}
        >
          <span className="text-lg font-bold">{index + 1}.</span>
          <span className="text-xs md:text-sm">{track}</span>
        </div>
      ))}
    </div>
  );
}
