import { Product } from "@/lib/types";
import { NavLink } from "react-router-dom";
import SuspenseImage from "./SuspenseImage";
import { Suspense } from "react";
import { CircleDashed } from "lucide-react";
import { CardContent, Card, CardFooter } from "@/components/ui/card";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard(product: Product) {
  const { id, image, price, title } = product;

  return (
    <NavLink to={`/product/${id}`} className="c-card" unstable_viewTransition>
      <Card className="w-full h-full mx-auto hover:translate-y-[-2px] transition-transform flex flex-col justify-between">
        <CardContent className="p-4">
          <div className="grid gap-2.5">
            <Suspense
              fallback={
                <div className="object-cover overflow-hidden border border-gray-200 rounded-lg aspect-square card-image c-card--album ">
                  <CircleDashed className="animate-spin" />
                </div>
              }
            >
              <SuspenseImage
                className="object-cover overflow-hidden border border-gray-200 rounded-lg aspect-square card-image c-card--album "
                src={image}
                alt={title}
              />
            </Suspense>
            <h6 className="font-semibold line-clamp-2">{title}</h6>
            {/* <p className="text-sm font-italic line-clamp-3">{description}</p> */}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <h6 className="font-semibold">${price}</h6>
          <AddToCartButton product={product} />
        </CardFooter>
      </Card>
    </NavLink>
  );
}
