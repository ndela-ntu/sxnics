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
  const cleanContent = content
    // Replace Cloudinary images with [img]
    .replace(
      /<img[^>]+src="https:\/\/res\.cloudinary\.com[^"]+"[^>]*>/g,
      "[img]"
    )
    // Remove all HTML tags
    .replace(/<\/?[^>]+(>|$)/g, "");

  const previewContent =
    cleanContent.slice(0, 50) + (cleanContent.length >= 50 ? "..." : "");
  const previewTitle = title.slice(0, 20) + (title.length >= 20 ? "..." : "");

  return (
    <Link
      href={`blog/${slug}`}
      className="flex space-x-5 border p-1 items-center w-full"
    >
      <div className="w-full sm:w-1/12 md:w-1/2">
        <Image
          src={`https:${coverImage.fields.file.url}`}
          alt="Image of blog post"
          layout="responsive"
          width={200} // Define default width
          height={100} // Define default height to maintain aspect ratio
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full sm:w-2/3 md:w-3/4 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-2">{previewTitle}</h2>
        <p className="text-sm">{previewContent}</p>
        <h2 className="py-1 text-sm px-2 my-2.5 text-black bg-white rounded-lg flex items-center justify-end">{new Date(createdAt).toLocaleDateString()}</h2>
        <h1 className="">
          - {author}
        </h1>
      </div>
    </Link>
  );
}
