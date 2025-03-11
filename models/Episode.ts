export interface IEpisode {
  id: number;
  created_at: string;
  name: string;
  artistId: number;
  description: string;
  imageUrl: string;
  audioUrl: string;
  tag: string;
  artists: {
    id: number;
    name: string;
    bio: string;
    imageUrl: string;
    socialLinks: any;
  };
}

export function isIEpisode(obj: any): obj is IEpisode {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.audioUrl === "string"
  );
}
