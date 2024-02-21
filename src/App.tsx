import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import {
  Component as HomeComponent,
  loader as homeLoader,
} from "./routes/Home";
import {
  Component as AlbumComponent,
  loader as albumLoader,
} from "./routes/Album";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
          path: "album/:id",
          loader: albumLoader(queryClient),
          Component: AlbumComponent,
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
