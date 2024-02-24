import { Outlet } from "react-router-dom";
import Layout from "./routes/Layout";
import CartContextProvider from "./contexts/CartContext";
import { Toaster } from "./components/ui/sonner.tsx";
import ScrollContextProvider from "./contexts/ScrollContext.tsx";

export default function App() {
  return (
    <ScrollContextProvider>
      <CartContextProvider>
        <Layout>
          <Outlet />
          <Toaster />
        </Layout>
      </CartContextProvider>
    </ScrollContextProvider>
  );
}
