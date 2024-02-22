import { useLoaderData, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productQuery } from "@/lib/queries";
import { productLoader } from "../lib/loaders";
import SuspenseImage from "@/components/SuspenseImage";
import { Suspense } from "react";

export default function Product() {
  const params = useParams()
  const {initialData} = useLoaderData() as Awaited<ReturnType<ReturnType<typeof productLoader>>>
  const {data:product} = useSuspenseQuery({
    ...productQuery(params.id!),
    initialData
  })

  return (
    <section>
      <div className="container flex flex-col items-start max-w-screen-lg px-6 pt-8 pb-12 mx-auto overflow-hidden lg:px-0 md:items-end md:flex-row">
        <div className="relative mr-32 shadow-xl w-72 md:w-auto c-record">
          <Suspense fallback={<div className="mx-auto size-[400px]">Loading image...</div>}>
            <SuspenseImage
              className="relative z-10 block bg-white rounded-md tag-album-cover c-record--album size-[400px]"
              
              src={product.images[0]}
              alt={product.title}
            />
          </Suspense>
        </div>
        <div className="flex flex-col justify-end flex-1 pt-8">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            {product.title}
          </h1>
          <p className="mt-3 text-3xl">{product.price}</p>
          <p className="mt-2 text-lg">
            {product.category.name} — {product.description}
          </p>
          <div className="flex mt-3">
          </div>
        </div>
      </div>

      <div className="container max-w-screen-lg mx-auto mb-10">
      </div>
    </section>
  );
}
