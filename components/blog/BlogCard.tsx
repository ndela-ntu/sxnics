import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  slug: string;
  content: string;
  coverImage: string;
  title: string;
}

export default function BlogCard({
  id,
  slug,
  content,
  title,
  coverImage,
}: BlogCardProps) {
  const cleanContent = content
    .replace(
      /<img[^>]+src="https:\/\/res\.cloudinary\.com[^"]+"[^>]*>/g,
      "[img]"
    )
    .replace(/<\/?(?!strong|em)[^>]+(>|$)/g, "");

  const previewContent =
    cleanContent.slice(0, 180) + (cleanContent.length > 200 ? "..." : "");

  return (
    <Link
      href={`blog/${slug}`}
      className="flex space-x-5 border p-1 items-center w-full"
    >
      <div className="w-full sm:w-1/6 md:w-1/8">
        <Image
          src={coverImage}
          alt="Image of blog post"
          layout="responsive"
          width={300} // Define default width
          height={150} // Define default height to maintain aspect ratio
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full sm:w-2/3 md:w-3/4">
        <h2 className="text-xl mb-2">{title}</h2>
        <p className="">{previewContent}</p>
      </div>
    </Link>
  );
}
