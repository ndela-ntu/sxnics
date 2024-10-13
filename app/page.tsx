import BlogPostCarousel from "@/components/BlogPostCarousel";
import EpisodeCarousel from "@/components/EpisodeCarousel";
import ShopCarousel from "@/components/ShopCarousel";
import client from "@/lib/contentful";
import { IBlogPost } from "@/models/BlogPost";
import { supabase } from "@/utils/supabase";
import { Montserrat } from "next/font/google";
import Link from "next/link";

export const revalidate = 60;

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Home: React.FC = async () => {
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
    <div className="flex items-center justify-center w-full">
      <h1 className="font-bold text-lg">Episodes</h1>
      <EpisodeCarousel episodes={episodes} />
      <h1 className="font-bold text-lg">Blogspot</h1>
      <BlogPostCarousel blogPosts={blogPosts} />
      <h1 className="font-bold text-lg">Shop</h1>
      <ShopCarousel shopItems={shopItems} />
    </div>
  );
};
