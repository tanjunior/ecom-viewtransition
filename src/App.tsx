import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import HomeComponent from "./routes/Home";
import Product from "@/routes/Product"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { homeLoader, productLoader } from "./lib/loaders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})

const router = createBrowserRouter(
  [
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
          path: "product/:id",
          loader: productLoader(queryClient),
          Component: Product,
        },
      ],
    },
  ],
);

export default function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools buttonPosition="bottom-right" />
  </QueryClientProvider>
}
