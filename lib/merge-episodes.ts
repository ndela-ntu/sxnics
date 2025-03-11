import { IVideoEpisode } from "../models/VideoEpisode";
import { IEpisode } from '../models/Episode';
import { IMergedEpisode } from '../models/MergedEpisode';

export const mergeEpisodes = (
  videoEpisodes: IVideoEpisode[],
  audioEpisodes: IEpisode[]
): IMergedEpisode[] => {
  const merged = [
    ...videoEpisodes.map((video) => ({
      ...video,
      mediaUrl: video.videoUrl,
      type: "video" as const,
    })),
    ...audioEpisodes.map((audio) => ({
      ...audio,
      mediaUrl: audio.audioUrl,
      type: "audio" as const,
    })),
  ];

  return merged.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};