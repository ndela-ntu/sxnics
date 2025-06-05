import BecomeSupporter from "@/components/BecomeSupporter";
import BlogPostCarousel from "@/components/BlogPostCarousel";
import Divider from "@/components/Divider";
import EpisodeCarousel from "@/components/EpisodeCarousel";
import EpisodeGrid from "@/components/EpisodeGrid";
import EventsCarousel from "@/components/EventsCarousel";
import RadioPlayer from "@/components/RadioPlayer";
import ReleasesCarousel from "@/components/ReleasesCarousel";
import ShopCarousel from "@/components/ShopCarousel";
import CuratorsCarousel from "@/components/CuratorsCarousel";
import client from "@/lib/contentful";
import { mergeEpisodes } from "@/lib/merge-episodes";
import { IBlogPost } from "@/models/BlogPost";
import { supabase } from "@/utils/supabase";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import BlogPostsGrid from "@/components/BlogPostsGrid";

export const revalidate = 60;

export default async function Page() {
  const { data: releases, error: releasesError } = await supabase
    .from("releases")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(10);

  const { data: shopItems, error: shopError } = await supabase
    .from("shop_items")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(5);

  const { data: audioEpisodes, error: audioEpisodesError } = await supabase
    .from("episodes")
    .select(`*, artists (id, name)`)
    .limit(8)
    .order("id", { ascending: false });

  const { data: videoEpisodes, error: videoEpisodesError } = await supabase
    .from("video_episodes")
    .select(`*, artists (id, name)`)
    .limit(8)
    .order("id", { ascending: false });

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false });

  const { data: artists, error: artistsError } = await supabase
    .from("artists")
    .select("*")
    .eq("is_resident", true);

  const response = await client.getEntries({
    content_type: "blogPost",
    order: ["sys.createdAt"],
    limit: 4,
  });
  const blogPosts: IBlogPost[] = response.items.map((item: any) => {
    const { content, slug, title, image, author, date } = item.fields;

    return {
      id: item.sys.id,
      content: content!.content[0].content[0].value,
      slug: slug,
      title: title,
      coverImage: image,
      author: author,
      createdAt: date,
    };
  });

  if (
    shopError ||
    audioEpisodesError ||
    releasesError ||
    videoEpisodesError ||
    eventsError ||
    artistsError
  ) {
    return (
      <div>{`An error occurred:  ${shopError && shopError.message}${
        audioEpisodesError && audioEpisodesError.message
      }${releasesError && releasesError.message} ${
        videoEpisodesError && videoEpisodesError.message
      } ${eventsError && eventsError.message} ${artistsError?.message}`}</div>
    );
  }

  const episodes = mergeEpisodes(videoEpisodes, audioEpisodes).sort(
    (a, b) => b.id - a.id
  );

  return (
    <div className="flex flex-col items-center justify-center w-full pb-28">
      <div className="h-full w-full">
        <div className="flex items-stretch h-full">
          <h1 className="text-sm md:text-base bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Episodes
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Episodes from resident djs and curators.
          </p>
        </div>
        <EpisodeGrid episodes={episodes} />
        <div className="flex items-center justify-end w-full pt-2">
          <Link className="flex items-center space-x-2.5" href="/episodes">
            <span>View All</span>
            <span>
              <FaArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
      <Divider />
      <div className="h-full w-full">
        <div className="flex items-stretch h-full">
          <h1 className="text-sm md:text-base bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Curators
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Resident djs and curators
          </p>
        </div>
        <CuratorsCarousel curators={artists} />
        <div className="flex items-center justify-end w-full pt-2">
          <Link className="flex items-center space-x-2.5" href="/artists">
            <span>View All</span>
            <span>
              <FaArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
      <Divider />
      <div className="h-full w-full">
        <div className="flex items-stretch h-full">
          <h1 className="text-sm md:text-base bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Blog Posts
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Blog posts and interviews
          </p>
        </div>
        <BlogPostsGrid blogPosts={blogPosts} />
        {/* <BlogPostCarousel blogPosts={blogPosts} /> */}
        <div className="flex items-center justify-end w-full pt-2">
          <Link className="flex items-center space-x-2.5" href="/blog">
            <span>View All</span>
            <span>
              <FaArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
      <Divider />
      {/* <div className="h-full w-full">
        <div className="flex items-stretch h-full">
          <h1 className="text-sm md:text-base bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Weekly Picks
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Top and picked latest releases
          </p>
        </div>
        <ReleasesCarousel releases={releases} />
        <div className="flex items-center justify-end w-full pt-2">
          <Link className="flex items-center space-x-2.5" href="/release-radar">
            <span>View More</span>
            <span>
              <FaArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
      <Divider /> */}
      <div className="h-full w-full">
        <div className="flex items-stretch h-full">
          <h1 className="bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Shop
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Merch. Artworks from various artists.
          </p>
        </div>
        <ShopCarousel shopItems={shopItems} />
        <div className="flex items-center justify-end w-full pt-2">
          <Link className="flex items-center space-x-2.5" href="/shop">
            <span>View All</span>
            <span>
              <FaArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
      <Divider />
      {/* <BecomeSupporter /> */}
      {events.length > 0 && (
        <div className="h-full w-full">
          <div className="flex items-stretch h-full">
            <h1 className="bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
              Events
            </h1>
            <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
              Happening events, your gig guide.
            </p>
          </div>
          <EventsCarousel events={events} />
          <div className="flex items-center justify-end w-full pt-2">
            <Link className="flex items-center space-x-2.5" href="/events">
              <span>View All</span>
              <span>
                <FaArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
