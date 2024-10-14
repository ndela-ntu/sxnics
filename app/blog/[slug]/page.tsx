import Post from "@/components/blog/Post";
import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import Image from 'next/image'
import { Document } from '@contentful/rich-text-types';

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { url, height, width, description } = node.data.target.fields.file;
      return (
        <Image
          src={`https:${url}`}
          height={height ?? 1280}
          width={width ?? 630}
          alt={description || ""}
          className="my-4 rounded-lg"
        />
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
  },
};

async function getBlogPost(slug: string) {
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (!response.items.length) {
    throw new Error('Blog post not found');
  }

  return response.items[0];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  const { title, slug, content, image, author, date } = post.fields;

  return (
    <div className="h-full">
      <Post
        slug={slug as string}
        content={documentToReactComponents(content as Document, options)}
        coverImage={image}
        title={title as string}
        author={author as string}
        createdAt={date}
      />
    </div>
  );
}
