import { IMergedEpisode } from "@/models/MergedEpisode";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const AudioContext = createContext<
  | {
      isRadioPlaying: boolean | null;
      setIsRadioPlaying: Dispatch<SetStateAction<boolean | null>>;
      activeEpisode: IMergedEpisode | null;
      setActiveEpisode: Dispatch<SetStateAction<IMergedEpisode | null>>;
      isEpisodePlaying: boolean | null;
      setIsEpisodePlaying: Dispatch<SetStateAction<boolean | null>>;
    }
  | undefined
>(undefined);

interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({
  children,
}) => {
  const [isRadioPlaying, setIsRadioPlaying] = useState<boolean | null>(false);
  const [activeEpisode, setActiveEpisode] = useState<IMergedEpisode | null>(null);
  const [isEpisodePlaying, setIsEpisodePlaying] = useState<boolean | null>(false);

  return (
    <AudioContext.Provider
      value={{
        isRadioPlaying,
        setIsRadioPlaying,
        activeEpisode,
        setActiveEpisode,
        isEpisodePlaying,
        setIsEpisodePlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be within a Provider");
  }

  return context;
};
