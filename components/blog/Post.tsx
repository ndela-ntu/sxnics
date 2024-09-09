import Image from "next/image";

interface PostProps {
  id: string;
  slug: string;
  content: string;
  coverImage: string;
  title: string;
  author: string;
}

export default function Post({
  id,
  slug,
  content,
  coverImage,
  title,
  author,
}: PostProps) {
  return (
    <div className="flex flex-col p-5">
      <h1 className="font-bold text-3xl">{title}</h1>
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
      <h1 className="text-xl place-self-end py-5">-{author}</h1>
    </div>
  );
}
