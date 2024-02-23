import { Product } from "@/lib/types";
import { NavLink } from "react-router-dom";
import SuspenseImage from "./SuspenseImage";
import { Suspense } from "react";
import {CircleDashed} from "lucide-react"

export default function Card({ id, image, price, title }: Product) {
  return (
    <div className="flex flex-col c-card">
      <NavLink
        preventScrollReset
        to={`/product/${id}`}
        className="text-black hover:text-pink-500"
        unstable_viewTransition
      >
        <div className="relative shadow-md hover:shadow-lg">
          <Suspense fallback={<div className="flex items-center justify-center text-center size-64 animate-pulse"><CircleDashed className="animate-spin" /></div>}>
            <SuspenseImage
              className="relative z-10 object-contain rounded-md card-image c-card--album size-64"
              src={image}
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
