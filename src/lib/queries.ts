// import { FragmentOf, graphql } from "@/graphql/graphql";
import { productSchema, productsSchema } from "@/lib/types";
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
      return productsSchema.parse(data)
    },
  });

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async () => {
      const data = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res=>res.json())
      return productSchema.parse(data)
    },
  });

