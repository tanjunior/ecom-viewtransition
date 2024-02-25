import useAuth from "@/hooks/useAuth";
import { Product } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type CartProduct = {
  productId: number;
  quantity: number;
};

type Cart = {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
};

type CartItem = Omit<CartProduct, "productId"> & Product;

export const CartContext = createContext<{
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (product: Product, quantity: number) => void;
} | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const products = queryClient.getQueryData<Product[]>(["products"]);

    async function getUserCart() {
      const res = await fetch(
        `https://fakestoreapi.com/carts/user/${user!.id}`
      );
      if (!res.ok) return setCart([]);
      const data: Cart[] = await res.json();
      if (!data || data.length == 0) return setCart([]);

      const cart: CartItem[] = [];

      for (let index = 0; index < data[0].products.length; index++) {
        const item = data[0].products[index];
        const product = products?.find(
          (product) => product.id === item.productId
        );
        if (!product) continue;
        cart.push({ ...product, quantity: item.quantity });
      }
      setCart(cart);
    }

    getUserCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function addToCart(product: Product, quantity: number) {
    if (!user) {
      return toast(
        <div>
          "You must be login first!" <Link to={"login"}>Login in now</Link>
        </div>
      );
    }
    setCart((prev) => {
      if (prev.length === 0) {
        return [
          {
            ...product,
            quantity,
          },
        ];
      }

      const exist = prev.find((item) => item.id == product.id);
      if (exist === undefined) {
        const cur = prev.map(item => item)
        cur.push({
          ...product,
          quantity,
        });
        return cur;
      }

      return prev.map((item) => {
        if (item.id == product.id) item.quantity = item.quantity + quantity;
        return item;
      });
    });
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
