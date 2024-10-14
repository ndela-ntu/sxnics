import BlogPostCarousel from "@/components/BlogPostCarousel";
import Divider from "@/components/Divider";
import EpisodeCarousel from "@/components/EpisodeCarousel";
import ShopCarousel from "@/components/ShopCarousel";
import client from "@/lib/contentful";
import { IBlogPost } from "@/models/BlogPost";
import { supabase } from "@/utils/supabase";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export const revalidate = 60;

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default async function Page() {
  const { data: shopItems, error: shopError } = await supabase
    .from("shop_items")
    .select("*")
    .abortSignal(AbortSignal.timeout(5000));

  const { data: episodes, error: episodesError } = await supabase
    .from("episodes")
    .select("*")
    .abortSignal(AbortSignal.timeout(5000));

  const response = await client.getEntries({ content_type: "blogPost" });
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

  if (shopError || episodesError) {
    return (
      <div>{`An error occurred:  ${shopError && shopError.message}${
        episodesError && episodesError.message
      }`}</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Divider />
      <div className="h-full w-full">
        <div className="flex items-stretch h-full">
          <h1 className="bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Episodes
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Episodes from resident djs and more.
          </p>
        </div>
        <EpisodeCarousel episodes={episodes} />
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
          <h1 className="bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Blog Spot
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Latest news and more.
          </p>
        </div>
        <BlogPostCarousel blogPosts={blogPosts} />
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
      <div className="h-full w-full">
        <div className="flex items-stretch h-full">
          <h1 className="bg-white text-black m-0 max-w-fit py-1.5 px-1 self-center">
            Shop
          </h1>
          <p className="text-xs md:text-sm border px-1 flex-1 flex items-center">
            Shop to support the platform.
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
    </div>
  );
}
