import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import HomeComponent from "./routes/Home";
import ProductComponent from "@/routes/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { homeLoader, loginLoader, productLoader } from "./lib/loaders";
import LoginComponent from "./routes/Login";
import ScrollContextProvider from "./contexts/ScrollContext";
import RegisterComponent from "./routes/Register";
import AccountLayout from "./routes/AccountLayout";
import useAuth from "./hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const baseRoutes : RouteObject[] = [
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
        element: <Navigate to="/login" state={{from: "/account"}} />,
      }
    ],
  },
]

const userRoutes : RouteObject[] = [
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
          }
        ]
      }
    ],
  },
]


const router = createBrowserRouter(baseRoutes);
const userRouter = createBrowserRouter(userRoutes);


export default function App() {
  const { user } = useAuth()
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollContextProvider>
        <RouterProvider router={user ? userRouter : router} />
      </ScrollContextProvider>
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
