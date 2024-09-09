import Post from "@/components/blog/Post";
import BlogPost from "@/models/BlogPost";
import connectMongo from "@/utils/ConnectMongo";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  await connectMongo();
  const blogPost = await BlogPost.findOne({ slug: params.slug }).exec();

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="h-full">
      <Post
        id={blogPost._id.toString()}
        slug={blogPost.slug}
        content={blogPost.content}
        coverImage={blogPost.coverImage}
        title={blogPost.title}
        author={blogPost.author}
      />
    </div>
  );
}
