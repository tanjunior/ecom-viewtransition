import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

export default function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
