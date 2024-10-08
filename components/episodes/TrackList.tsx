"use client";

import React, { useEffect, useState } from "react";

interface Track {
  id: number;
  title: string;
  stream_url: string;
  waveform_url: string;
}

const TrackList = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/Tracks", {
          method: "GET",
        });
        const data = await res.json();
        console.log(res);
        setTracks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return <p>Loading tracks...</p>;
  }

  if (!tracks.length) {
    return <p>No tracks available.</p>;
  }

  return (
    <div>
      {tracks.map((track) => (
        <div key={track.id} className="track-item">
          <h3>{track.title}</h3>
          <audio controls>
            <source src={`${track.stream_url}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
          <img src={track.waveform_url} alt={`${track.title} waveform`} />
        </div>
      ))}
    </div>
  );
};

export default TrackList;
