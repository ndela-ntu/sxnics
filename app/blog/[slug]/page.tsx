import Post from "@/components/blog/Post";
import BlogPost from "@/models/BlogPost";
import connectMongo from "@/utils/ConnectMongo";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  await connectMongo();
  const post = await BlogPost.findOne({ slug: params.slug }).exec();
  const blogPost = post.toObject();

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
        createdAt={blogPost.createdAt}
      />
    </div>
  );
}
