import { useLoaderData } from "react-router-dom";
import { useSuspenseQueries } from "@tanstack/react-query";
import { categoriesQuery, productsQuery } from "@/lib/queries";
import { homeLoader } from "../lib/loaders";
import { useEffect } from "react";
import useScroll from "@/hooks/useScroll";
import ProductsList from "@/components/ProductsList";

export default function HomeComponent() {
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof homeLoader>>
  >;
  const data = useSuspenseQueries({
    queries: [
      { ...productsQuery(), initialData: initialData.products },
      { ...categoriesQuery(), initialData: initialData.categories },
    ],
    combine: (results) => {
      return {
        products: results[0].data,
        categories: results[1].data,
      };
    },
  });

  const { scrollPosition, setScrollPosition } = useScroll();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.scrollTo({
      top: scrollPosition,
      behavior: "instant",
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex-1 w-full">
      <div className="container px-0 py-6 md:py-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <h1 className="text-4xl font-bold leading-none md:text-5xl">
              Home
            </h1>
            <ProductsList {...data} />
          </div>
        </div>
      </div>
    </main>
  );
}
