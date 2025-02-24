import Post from "@/components/blog/Post";
import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import Image from "next/image";
import { Document } from "@contentful/rich-text-types";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  const { title, content, image, date } = post.fields;

  const plainTextContent =
    documentToPlainTextString(content as Document)?.slice(0, 50) ?? "";

  return {
    title: (title as string) ?? "",
    description: plainTextContent,
    openGraph: {
      type: "article",
      title: (title as string) ?? "",
      description: plainTextContent,
      publishedTime: new Date(date as any).toLocaleDateString(),
      images: [
        {
          url: `https:${(image as any)?.fields.file.url ?? ""}`,
          width: 1200,
          height: 630,
          alt: (title as string) ?? "",
        },
      ],
    },
  };
}

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

    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      // Ensure the embedded entry has an `iframeUrl` field
      if (node.data.target.fields.iframeUrl) {
        return (
          <iframe
            src={node.data.target.fields.iframeUrl}
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            className="my-4 rounded-lg"
          ></iframe>
        );
      }
      return null;
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
    throw new Error("Blog post not found");
  }

  return response.items[0];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  const { title, slug, content, image, author, date } = post.fields;

  return (
    <div className="h-full pb-28">
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
