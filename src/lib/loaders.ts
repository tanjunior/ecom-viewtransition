import { categoriesQuery, productQuery, productsQuery, usersQuery } from "@/lib/queries"
import { QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"


export function homeLoader(queryClient: QueryClient) {
  return async () => {
    const categories = await queryClient.ensureQueryData(categoriesQuery())
    const products = await queryClient.ensureQueryData(productsQuery())
    const initialData = {categories, products}
    // console.log(initialData)
    return {initialData}
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