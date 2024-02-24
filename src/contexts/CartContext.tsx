import useAuth from "@/hooks/useAuth";
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

type Cart = {
  productId: number;
  quantity: number;
}[];

export const CartContext = createContext<{
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  addToCart: (id: number, quantity: number) => void;
} | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart>([]);

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    async function getUserCart() {
      const res = await fetch(`https://fakestoreapi.com/carts/${user!.id}`);
      if (!res.ok) return setCart([]);
      const data = await res.json();
      setCart(data ? data.products : []);
    }

    getUserCart();
  }, [user]);

  function addToCart(id: number, quantity: number) {
    if (!user)
      return toast(
        <div>
          "You must be login first!" <Link to={"login"}>Login in now</Link>
        </div>
      );
    setCart((prev) => {
      if (prev.length === 0)
        return [
          {
            productId: id,
            quantity: 1,
          },
        ];

      const exist = prev.find((item) => item.productId == id);
      if (exist == undefined) {
        prev.push({
          productId: id,
          quantity: 1,
        });
        return prev;
      }

      return prev.map((item) => {
        if (item.productId == id) item.quantity = item.quantity + quantity;
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
