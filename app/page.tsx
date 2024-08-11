import Head from "next/head";
import RadioPlayer from "../components/RadioPlayer";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import Release from "@/models/Release";
import Releases from "@/components/Releases";
import FeaturedArtists from "@/components/FeaturedArtists";
import Artist from "@/models/Artist";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Home: React.FC = () => {
  return (
    <main className={`bg-black h-auto text-white ${montserrat.className}`}>
      <div className="flex items-center justify-between p-5">
        <h1 className={`text-5xl`}>SXNICS</h1>
        <Link href="/shop" className="border border-white p-2.5">
          Shop
        </Link>
      </div>
      <RadioPlayer />
      <div className="flex flex-col items-center justify-center p-5 border">
        <h2 className={`text-3xl mb-5`}>Releases</h2>
        <Releases releases={dummyReleases} />
      </div>
      <div className="flex flex-col items-center justify-center p-5 border">
        <h2 className={`text-3xl mb-5`}>Featured Artists</h2>
        <FeaturedArtists artists={artists} />
      </div>
    </main>
  );
};

const artists: Artist[] = [
  {
    name: 'Kelvin Momo',
    avatarURL: '/images/Kelvin_Momo.jpg',
    location: 'Soweto'
  },
  {
    name: 'Kabza De Small',
    avatarURL: "/images/Kabza.jpg",
    location: "Soweto"
  }
]

const dummyReleases: Release[] = [
  {
    artist: "Kelvin Momo",
    album: "SEWE",
    releasedIn: new Date("2024-08-09T14:00:00"),
    coverURL: "/images/Sewe.jpg",
  },
  {
    artist: "Bubhesi",
    album: "Mfana",
    releasedIn: new Date("2024-08-09T14:00:00"),
    coverURL: "/images/Mfana.jpg",
  },
  {
    artist: "Reece Madlisa",
    album: "Abashwe",
    releasedIn: new Date("2024-08-09T14:00:00"),
    coverURL: "/images/Abashwe.jpg",
  },
  {
    artist: "Mr JazziQ",
    album: "The Grass Is Greener",
    releasedIn: new Date("2024-08-09T14:00:00"),
    coverURL: "/images/TGIG.jpg",
  },
];

export default Home;
