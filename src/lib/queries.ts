// import { FragmentOf, graphql } from "@/graphql/graphql";
import { productSchema, productsSchema, usersSchema } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

// import { Client, cacheExchange, fetchExchange } from 'urql';

// const client = new Client({
//   url: 'https://api.escuelajs.co/graphql',
//   exchanges: [cacheExchange, fetchExchange],
// });

// const productsFragment = graphql(`
//   fragment productsFragment on Product {
//     id
//     title
//     price
//     description
//     images
//     category {
//       id
//       name
//       image
//     }
//   }
// `)

// export type Product = FragmentOf<typeof productsFragment>

export const productsQuery = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: async () => {

      // const data = await client.query(productsFragment, {}).toPromise().then(res => res.data)
      // return data
      const data = await fetch('https://api.escuelajs.co/api/v1/products')
      .then(res=>res.json())
      const parse = productsSchema.safeParse(data)
      return parse.success? parse.data : []
    },
  });

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      if (!response.ok) return null
      const data = await response.json()
      const parse = productSchema.safeParse(data)
      return parse.success ? parse.data : null
    },
  });

export const usersQuery = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async () => {

      // const data = await client.query(productsFragment, {}).toPromise().then(res => res.data)
      // return data
      const data = await fetch('https://api.escuelajs.co/api/v1/users')
      .then(res=>res.json())
      const parse = usersSchema.safeParse(data)
      return parse.success? parse.data : []
    },
  });