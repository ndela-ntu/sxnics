"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import RadioPlayer from "@/components/RadioPlayer";
import AudioPlayer from "@/components/AudioPlayer";
import { useAudioContext } from "@/context/AudioContext";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { activeEpisode, setActiveEpisode, updateIsPlaying } =
    useAudioContext();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate a delay to show the loading indicator
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <header className="px-2.5 w-full sticky top-0 z-20 bg-black">
        <Navbar />
        <RadioPlayer />
      </header>
      <main className="px-2.5 w-full z-10 min-h-screen">
        {isLoading && <LoadingSpinner />}
        {children}
      </main>
      <footer>
        {activeEpisode && (
          <div>
            <AudioPlayer
              episode={activeEpisode}
              isPlaying={activeEpisode.isPlaying}
              onXClick={() => setActiveEpisode(null)}
              onTogglePlay={(value) => {
                setActiveEpisode((_) => ({
                  ...activeEpisode,
                  isPlaying: value,
                }));

                if (value) {
                  updateIsPlaying(false);
                }
              }}
            />
          </div>
        )}
      </footer>
    </>
  );
}
