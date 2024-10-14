import { IBlogPost } from "@/models/BlogPost";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

export default function BlogPostCarousel({
  blogPosts,
}: {
  blogPosts: IBlogPost[];
}) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent>
        {blogPosts.map((blogPost, index) => {
          const previewTitle =
            blogPost.title.slice(0, 20) +
            (blogPost.title.length >= 20 ? "..." : "");
          return (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="">
                <Card className="w-full border-none bg-white text-black rounded-none p-0">
                  <CardTitle className="text-sm py-2 pl-2">
                    {previewTitle}
                  </CardTitle>
                  <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                    <div className="w-full h-full">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={`https:${blogPost.coverImage.fields.file.url}`}
                          alt="Image of episode"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
