import BlogCard from "@/components/blog/BlogCard";
import client from "@/lib/contentful";

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
