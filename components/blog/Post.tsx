import Image from "next/image";
import { ReactNode } from "react";

interface PostProps {
  slug: string;
  content: ReactNode;
  coverImage: any;
  title: string;
  author: string;
  createdAt: any;
}

export default function Post({
  slug,
  content,
  coverImage,
  title,
  author,
  createdAt,
}: PostProps) {
  return (
    <div className="flex flex-col py-5 sm:px-1.5 md:px-2.5 lg:justify-center lg:items-center">
      <div className="flex flex-wrap items-center justify-between w-full">
        <h1 className="font-bold text-3xl underline">{title}</h1>
        <p className="bg-white text-black p-1">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="w-full sm:w-1/6 md:w-1/4 my-5">
        <Image
          src={`https:${coverImage.fields.file.url}`}
          alt="Image of blog post"
          layout="responsive"
          width={300} // Define default width
          height={150} // Define default height to maintain aspect ratio
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="lg:w-[60%]">{content}</div>
      <h1 className="text-base place-self-end my-5 bg-white text-black px-2.5">
        -{author}
      </h1>
    </div>
  );
}
