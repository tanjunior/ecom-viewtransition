import { useLoaderData, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productQuery } from "@/lib/queries";
import { productLoader } from "../lib/loaders";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ProductComponent() {
  const params = useParams();
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof productLoader>>
  >;
  const { data: product } = useSuspenseQuery({
    ...productQuery(params.id!),
    initialData,
  });
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (!product) {
    return <div>Not found...</div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row md:items-end">
        <div className="relative shadow-xl lg:mr-32 size-full lg:size-[400px] c-record">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="tag-album-cover c-record--album"
          >
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    className="relative z-10 block bg-white rounded-md lg:size-[400px] size-full"
                    src={image}
                    alt={product.title}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="right-0" />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col justify-end flex-1 pt-8">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            {product.title}
          </h1>
          <p className="mt-3 text-3xl">{product.price}</p>
          <p className="mt-2 text-lg">
            {product.category.name} — {product.description}
          </p>
          <div className="flex mt-3"></div>
        </div>
      </div>

      <div className="container max-w-screen-lg mx-auto mb-10"></div>
    </>
  );
}
