"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import RadioPlayer from "@/components/RadioPlayer";
import AudioPlayer from "@/components/AudioPlayer";
import { useAudioContext } from "@/context/AudioContext";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const {
    activeEpisode,
    setActiveEpisode,
    setIsRadioPlaying,
    isEpisodePlaying,
    setIsEpisodePlaying,
  } = useAudioContext();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(activeEpisode);
  }, [activeEpisode]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    window.scrollTo(0, 0);
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
      {activeEpisode && (
        <footer className="fixed bottom-0 left-0 right-0 z-50">
          <AudioPlayer
            key={activeEpisode.id}
            episode={activeEpisode}
            isPlaying={activeEpisode && isEpisodePlaying!}
            onXClick={() => setActiveEpisode(null)}
            onTogglePlay={(value) => {
              setIsEpisodePlaying(value);

              if (value) {
                setIsRadioPlaying(false);
              }
            }}
          />
        </footer>
      )}
    </>
  );
}
