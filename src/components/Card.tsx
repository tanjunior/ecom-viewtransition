import { Product } from "@/lib/types";
import { NavLink } from "react-router-dom";
import SuspenseImage from "./SuspenseImage";
import { Suspense } from "react";

export default function Card({ id, category, description, images, price, title }: Product) {
  return (
    <div className="flex flex-col c-card">
      <NavLink
        to={`/product/${id}`}
        className="text-black hover:text-pink-500"
        unstable_viewTransition
      >
        <div className="relative shadow-md hover:shadow-lg">
          <Suspense fallback={<div className="size-68">Loading image...</div>}>
            <SuspenseImage
              className="relative z-10 object-cover rounded-md card-image c-card--album size-68"
              src={images[0]}
              alt={title}
            />
          </Suspense>
        </div>
        <p className="pt-4 font-semibold">{title}</p>
        <p className="pt-1 text-gray-700">{price}</p>
      </NavLink>
    </div>
  );
}
