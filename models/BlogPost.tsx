import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    author: String,
    coverImage: String,
});

const BlogPost =(mongoose.models && mongoose.models.BlogPost) ||
mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;