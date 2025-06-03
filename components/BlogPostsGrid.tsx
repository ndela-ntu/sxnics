import { IBlogPost } from "@/models/BlogPost";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostsGrid({
  blogPosts,
}: {
  blogPosts: IBlogPost[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {blogPosts.map((post) => (
        <Link href={`/blog/${post.slug}`}>
          <div className="w-full bg-white text-black">
            <div className="flex bg-transparent aspect-square items-center justify-center">
              <div className="w-full h-full">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={`https:${post.coverImage.fields.file.url}`}
                    alt="Image of blog post"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 left-0 right-0 w-full text-center px-1 py-2 md:py-4 bg-gradient-to-t from-black/85 to-transparent text-white font-semibold text-base md:text-lg">
                    {post.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
