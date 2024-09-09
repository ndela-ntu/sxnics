import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    author: String,
    coverImage: String,
  },
  { timestamps: true } // This automatically adds and manages `createdAt` and `updatedAt`
);

const BlogPost =
  (mongoose.models && mongoose.models.BlogPost) ||
  mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
