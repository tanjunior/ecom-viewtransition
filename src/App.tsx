import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import HomeComponent from "./routes/Home";
import ProductComponent from "@/routes/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { homeLoader, productLoader } from "./lib/loaders";
import LoginComponent from "./routes/Login";
import ScrollContextProvider from "./contexts/ScrollContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: homeLoader(queryClient),
        Component: HomeComponent,
      },
      {
        path: "login",
        Component: LoginComponent,
      },
      {
        path: "product/:id",
        loader: productLoader(queryClient),
        Component: ProductComponent,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollContextProvider>
        <RouterProvider router={router} />
      </ScrollContextProvider>
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
