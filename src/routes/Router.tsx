import useAuth from "@/hooks/useAuth";
import { homeLoader, loginLoader, productLoader } from "@/lib/loaders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AccountLayout from "./AccountLayout";
import HomeComponent from "./Home";
import LoginComponent from "./Login";
import ProductComponent from "./Product";
import RegisterComponent from "./Register";
import App from "@/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const baseRoutes: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: homeLoader(queryClient),
        Component: HomeComponent,
      },
      {
        path: "login",
        loader: loginLoader(queryClient),
        Component: LoginComponent,
      },
      {
        path: "register",
        Component: RegisterComponent,
      },
      {
        path: "product/:id",
        loader: productLoader(queryClient),
        Component: ProductComponent,
      },
      {
        path: "account",
        element: <Navigate to="/login"/>,
        children: [
          {
            path: "*",
            element: <Navigate to="/login"/>,
          }
        ]
      },
    ],
  },
];

const userRoutes: RouteObject[] = [
  {
    path: "/",
    Component: App,
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
        path: "register",
        Component: RegisterComponent,
      },
      {
        path: "product/:id",
        loader: productLoader(queryClient),
        Component: ProductComponent,
      },
      {
        path: "account",
        Component: AccountLayout,
        children: [
          {
            index: true,
            element: <div>profile</div>,
          },
          {
            path: "cart",
            element: <div>cart</div>,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(baseRoutes);
const userRouter = createBrowserRouter(userRoutes);

export default function Router() {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={user ? userRouter : router} />
    </QueryClientProvider>
  );
}
