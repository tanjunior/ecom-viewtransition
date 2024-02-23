import { productQuery, productsQuery, usersQuery } from "@/lib/queries"
import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"


export function homeLoader(queryClient: QueryClient) {
  return async () => {
    return {initialData: await queryClient.ensureQueryData(productsQuery())}
  }
}

export function productLoader(queryClient: QueryClient) {
  return async ({params}: LoaderFunctionArgs) => {
    return {initialData: await queryClient.ensureQueryData(productQuery(params.id!))}
  }
}

export function loginLoader(queryClient: QueryClient) {
  return async () => {
    return {initialData: await queryClient.ensureQueryData(usersQuery())}
  }
}
