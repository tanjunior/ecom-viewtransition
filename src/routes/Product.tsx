import { useLoaderData, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productQuery } from "@/lib/queries";
import { productLoader } from "../lib/loaders";
import { Suspense } from "react";
import SuspenseImage from "@/components/SuspenseImage";
import { CircleDashed } from "lucide-react";

export default function ProductComponent() {
  const params = useParams();
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof productLoader>>
  >;
  const { data: product } = useSuspenseQuery({
    ...productQuery(params.id!),
    initialData,
  });

  if (!product) {
    return <div>Not found...</div>;
  }
  
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row md:items-start">
        <div className="relative shadow-xl lg:mr-32 size-full lg:size-[400px] c-record">
          <Suspense
            fallback={
              <div className="flex items-center justify-center text-center size-64 animate-pulse">
                <CircleDashed className="animate-spin" />
              </div>
            }
          >
            <SuspenseImage
              className="relative z-10 object-contain rounded-md tag-album-cover c-record--album size-full"
              src={product.image}
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
            {product.category} — {product.description}
          </p>
          <div className="flex mt-3"></div>
        </div>
      </div>

      <div className="container max-w-screen-lg mx-auto mb-10"></div>
    </>
  );
}
