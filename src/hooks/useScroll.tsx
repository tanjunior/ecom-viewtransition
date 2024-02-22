import { ScrollContext } from "@/contexts/ScrollContext";
import { useContext } from "react";


export default function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollContextProvider");
  }
  return context;
}
