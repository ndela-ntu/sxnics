import Image from "next/image";

interface PostProps {
  id: string;
  slug: string;
  content: string;
  coverImage: string;
  title: string;
  author: string;
  createdAt: Date;
}

export default function Post({
  id,
  slug,
  content,
  coverImage,
  title,
  author,
  createdAt
}: PostProps) {
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="font-bold text-3xl underline">{title}</h1>
        <p className="bg-white text-black p-1 rounded-lg">{createdAt.toLocaleDateString()}</p>
      </div>
      <div className="w-full sm:w-1/6 md:w-1/4 my-5">
        <Image
          src={coverImage}
          alt="Image of blog post"
          layout="responsive"
          width={300} // Define default width
          height={150} // Define default height to maintain aspect ratio
          className="w-full h-auto object-cover"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <h1 className="text-lg place-self-end my-5 italic bg-white text-black rounded-lg px-2.5">-{author}</h1>
    </div>
  );
}
