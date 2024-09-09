import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  slug: string;
  content: string;
  coverImage: string;
  title: string;
  author: string;
  createdAt: Date;
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
  const cleanContent = content
    // Replace Cloudinary images with [img]
    .replace(
      /<img[^>]+src="https:\/\/res\.cloudinary\.com[^"]+"[^>]*>/g,
      "[img]"
    )
    // Remove all HTML tags
    .replace(/<\/?[^>]+(>|$)/g, "");

  const previewContent =
    cleanContent.slice(0, 50) + (cleanContent.length > 200 ? "..." : "");

  return (
    <Link
      href={`blog/${slug}`}
      className="flex space-x-5 border p-1 items-center w-full"
    >
      <div className="w-full sm:w-1/12 md:w-1/2">
        <Image
          src={coverImage}
          alt="Image of blog post"
          layout="responsive"
          width={200} // Define default width
          height={100} // Define default height to maintain aspect ratio
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full sm:w-2/3 md:w-3/4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm">{previewContent}</p>
        <h2 className="mt-2.5">{createdAt.toLocaleDateString()}</h2>
        <h1 className="text-sm  text-black bg-white p-1 my-2.5 rounded-lg">
          - {author}
        </h1>
      </div>
    </Link>
  );
}
