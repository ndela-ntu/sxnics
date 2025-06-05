import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  slug: string;
  content: string;
  coverImage: any;
  title: string;
  author: string;
  createdAt: any;
}

export default function BlogCard({
  id,
  slug,
  content,
  title,
  coverImage,
  author,
  createdAt,
}: BlogCardProps) {
  return (
    <Link
      href={`blog/${slug}`}
      className="border p-1 w-full block relative overflow-hidden"
    >
      <div className="w-full aspect-video relative overflow-hidden">
        <Image
          src={`https:${coverImage.fields.file.url}`}
          alt="Image of blog post"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover filter brightness-75 blur-sm"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Content overlay - centered text */}
        <div className="absolute inset-0 z-20 p-4 flex flex-col justify-center items-center text-center text-white">
          <div className="flex flex-col items-center max-w-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-2 shadow-text">
              {title}
            </h2>
          </div>

          <div className="absolute bottom-4 left-0 w-full flex justify-center items-center">
            <div className="text-center">
              <span className="text-sm underline block">
                {new Date(createdAt).toLocaleDateString()}
              </span>
              <span className="text-sm underline block">by {author}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
