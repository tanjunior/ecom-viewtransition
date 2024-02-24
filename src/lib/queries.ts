import { categoriesSchema, productSchema, productsSchema, usersSchema } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export const productsQuery = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await fetch("https://fakestoreapi.com/products").then(
        (res) => res.json()
      );

      const parse = productsSchema.safeParse(data);
      return parse.success ? parse.data : [];
    },
  });

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) return null;
      const data = await response.json();
      const parse = productSchema.safeParse(data);
      return parse.success ? parse.data : null;
    },
  });

export const usersQuery = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await fetch("https://fakestoreapi.com/users").then((res) =>
        res.json()
      );
      const parse = usersSchema.safeParse(data);
      return parse.success ? parse.data : [];
    },
  });

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await fetch("https://fakestoreapi.com/products/categories").then(
        (res) => res.json()
      );
      const parse = categoriesSchema.safeParse(data);
      return parse.success ? parse.data : [];
    },
  });
