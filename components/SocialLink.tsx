'use client';

import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLink({
  to,
  username,
}: {
  to: string;
  username: string;
}) {
  const openInstagram = () => {
    const cleanUsername = username.startsWith("@")
      ? username.slice(1)
      : username;

    const instagramUrl = `https://www.instagram.com/${cleanUsername}`;
    window.open(instagramUrl, "_blank");
  };

  const openX = () => {
    const cleanUsername = username.startsWith("@")
      ? username.slice(1)
      : username;

    const xUrl = `https://twitter.com/${cleanUsername}`;
    window.open(xUrl, "_blank");
  };

  const handleClick = () => {
    switch (to) {
      case "instagram":
        openInstagram();
        break;
      case "x":
        openX();
        break;
      default:
        openInstagram();
        break;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-black bg-white"
    >
      {to === "instagram" ? <FaInstagram /> : <FaXTwitter />}
    </button>
  );
}
