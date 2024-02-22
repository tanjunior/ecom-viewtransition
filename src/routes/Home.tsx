import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/lib/queries";
import { homeLoader } from "../lib/loaders";
import { useEffect } from "react";
import useScroll from "@/hooks/useScroll";

export default function HomeComponent() {
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof homeLoader>>
  >;
  const { data: products } = useSuspenseQuery({
    ...productsQuery(),
    initialData,
  });

  const {scrollPosition, setScrollPosition} = useScroll()
  
  const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
  };
  
  useEffect(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: "instant"
      });

      
      window.addEventListener('scroll', handleScroll, { passive: true });
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

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
        {/* <ScrollRestoration getKey={(location, matches) => location.pathname}/> */}
      </section>
  );
}
