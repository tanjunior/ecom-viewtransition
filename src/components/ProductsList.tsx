import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProductCard from "./ProductCard";
import { Category, Product } from "@/lib/types";
import { useState } from "react";

export default function ProductsList({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [filter, setFilter] = useState<Category[]>(categories);
  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-lg font-semibold md:text-xl">Product Categories</h2>
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
      <div className="items-start gap-4 md:gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {products
            .filter((product) => filter.includes(product.category))
            .map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
        </div>
      </div>
    </>
  );
}
