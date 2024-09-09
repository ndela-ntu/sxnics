import BlogCard from "@/components/blog/BlogCard";
import BlogPost from "@/models/BlogPost";
import connectMongo from "@/utils/ConnectMongo";

export default async function Page() {
  await connectMongo();
  const blogPosts = await BlogPost.find().lean();

  if (blogPosts.length === 0) return <div>No Blogs to Display</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start w-full flex-wrap">
      {blogPosts.map((blogPost) => {
        console.log(blogPost);
        return (
          <BlogCard
            key={blogPost._id!.toString()}
            id={blogPost._id!.toString()}
            content={blogPost.content!}
            slug={blogPost.slug!}
            title={blogPost.title!}
            coverImage={blogPost.coverImage!}
            author={blogPost.author!}
            createdAt={blogPost.createdAt!}
          />
        )
      })}
    </div>
  );
}
