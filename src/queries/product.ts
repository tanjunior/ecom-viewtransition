import { queryOptions } from "@tanstack/react-query";

export const productsQuery = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: async () => {
      return await fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
    },
  });

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ["product"],
    queryFn: async () => {
      return await fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res=>res.json())
    },
  });

