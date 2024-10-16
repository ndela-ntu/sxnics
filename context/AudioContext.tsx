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
      isRadioPlaying: boolean;
      updateIsPlaying: (value: boolean) => void;
    }
  | undefined
>(undefined);

interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({
  children,
}) => {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  const updateIsPlaying = (newValue: boolean) => {
    setIsRadioPlaying(newValue);
  };

  return (
    <AudioContext.Provider value={{ isRadioPlaying, updateIsPlaying }}>
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
