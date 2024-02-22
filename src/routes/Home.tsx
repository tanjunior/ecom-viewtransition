import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/lib/queries";
import { homeLoader } from "../lib/loaders";

export default function HomeComponent() {
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof homeLoader>>
  >;
  const { data: products } = useSuspenseQuery({
    ...productsQuery(),
    initialData,
  });

  return (
    <section className="py-8">
      <div className="container flex flex-wrap items-center max-w-screen-lg px-6 pt-4 pb-12 mx-auto lg:px-0">
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-black">
          Home
        </h2>
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
