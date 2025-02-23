import BlogCard from "@/components/blog/BlogCard";
import client from "@/lib/contentful";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Blog posts and interviews about various artists in the underground scene",
  openGraph: {
    title: "Blog Posts",
    description: "Blog posts from artists making an impact in the underground music scene",
    images: [
      {
        url: '../LOGO.png', // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "SXNICS LOGO",
      },
    ],
  },
}

async function getBlogPosts() {
  const response = await client.getEntries({ content_type: "blogPost" });

  return response.items;
}

export default async function Page() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start w-full flex-wrap pb-28">
      {blogPosts.map((blogPost: any) => {
        const { content, slug, title, image, author, date } = blogPost.fields;
        return (
          <BlogCard
            key={blogPost.sys.id}
            id={blogPost.sys.id}
            content={content.content[0].content[0].value.substring(0, 50)}
            slug={slug}
            title={title}
            coverImage={image}
            author={author}
            createdAt={date}
          />
        );
      })}
    </div>
  );
}
