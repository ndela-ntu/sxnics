import BlogCard from "@/components/blog/BlogCard";
import BlogPost from "@/models/BlogPost";
import connectMongo from "@/utils/ConnectMongo";

export default async function Page() {
  await connectMongo();
  const blogPosts = await BlogPost.find();

  if (blogPosts.length === 0) return <div>No Blogs to Display</div>;

  return (
    <div className="flex flex-row items-start w-full flex-wrap">
      {blogPosts.map((blogPost) => (
        <BlogCard
          key={blogPost.id!.toString()}
          id={blogPost.id!.toString()}
          content={blogPost.content!}
          slug={blogPost.slug!}
          title={blogPost.title!}
          coverImage={blogPost.coverImage!}
        />
      ))}
    </div>
  );
}
