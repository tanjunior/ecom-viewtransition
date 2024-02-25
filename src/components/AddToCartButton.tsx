import useCart from "@/hooks/useCart";
import { Button } from "./ui/button";
import { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Button
      variant="outline"
      onClick={e => {
        e.preventDefault();
        // e.stopPropagation();
        addToCart(product, 1);
      }}
    >
      Add to Cart
    </Button>
  );
}
