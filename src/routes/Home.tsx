import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useSuspenseQueries } from "@tanstack/react-query";
import { categoriesQuery, productsQuery } from "@/lib/queries";
import { homeLoader } from "../lib/loaders";
import { useEffect, useState } from "react";
import useScroll from "@/hooks/useScroll";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Category } from "@/lib/types";

export default function HomeComponent() {
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof homeLoader>>
  >;
  const { products, categories } = useSuspenseQueries({
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
  const [filter, setFilter] = useState<Category[]>(categories);

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

  products;

  return (
    <main className="flex-1 w-full">
      <div className="container px-0 py-6 md:py-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <h1 className="text-4xl font-bold leading-none md:text-5xl">
              Home
            </h1>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-lg font-semibold md:text-xl">
                Product Categories
              </h2>
              <ToggleGroup
                type="multiple"
                size="lg"
                variant="outline"
                onValueChange={setFilter}
                defaultValue={filter}
                className="gap-2 p-2"
              >
                {categories.map((category) => (
                  <ToggleGroupItem
                    key={category}
                    value={category}
                    className="rounded-full data-[state=on]:ring-offset-background ring-1"
                  >
                    {category}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
          <div className="items-start gap-4 md:gap-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {products
                .filter((product) => filter.includes(product.category))
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
