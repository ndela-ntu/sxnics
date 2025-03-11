import { extractYouTubeVideoId } from "@/lib/extract-youtube-id";

export const YouTubeEmbed = ({ videoUrl }: { videoUrl: string }) => {
  const videoId = extractYouTubeVideoId(videoUrl);

  return videoId ? (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
      <iframe
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  ) : (
    <p>Invalid YouTube URL</p>
  );
};