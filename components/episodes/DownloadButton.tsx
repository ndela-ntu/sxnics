"use client";

import { Download, Loader, X } from "lucide-react";
import React, { useState, useRef } from "react";

interface DownloadAudioButtonProps {
  fileUrl: string;
  fileName: string;
  className?: string;
  children?: React.ReactNode;
}

const DownloadAudioButton: React.FC<DownloadAudioButtonProps> = ({
  fileUrl,
  fileName,
  className = "",
  children = "Download Audio",
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(fileUrl, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const contentLength = response.headers.get("content-length");
      const totalLength = contentLength ? parseInt(contentLength) : 0;
      let downloadedLength = 0;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (!reader) throw new Error("Failed to read response body");

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        if (value) {
          chunks.push(value);
          downloadedLength += value.length;
          const progress = totalLength
            ? Math.round((downloadedLength / totalLength) * 100)
            : 0;
          setDownloadProgress(progress);
        }
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Download cancelled by user");
      } else {
        console.error("Error downloading audio:", error);
        alert("Failed to download audio file. Please try again.");
      }
    } finally {
      setIsDownloading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelDownload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-xs gap-2 ${className}`}>
      <div className="flex gap-2 items-start">
        <div className="relative flex flex-col items-center justify-center">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`px-2 py-2 border bg-transparent text-white rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
            aria-label={`Download audio file ${fileName}`}
          >
            {isDownloading ? (
              <>
                <Loader className="animate-spin w-5 h-5" />
              </>
            ) : (
              <>
                <Download />
              </>
            )}
          </button>
          {isDownloading && <span className="text-sm">{downloadProgress}%</span>}
        </div>
        {isDownloading && (
          <button
            onClick={handleCancelDownload}
            className="px-2 py-2 text-black bg-gray-300 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 transition-colors items-center"
            aria-label="Cancel download"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DownloadAudioButton;
