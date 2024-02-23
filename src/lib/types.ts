import { z } from "zod";

export type Product = z.infer<typeof productSchema>;

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().url(),
  }),
  images: z.array(z.string()).refine(arr => arr.length > 0, {message: "Product must have at least one image"}).transform(arr => {
    arr.map(image => {image.replace(/[\\[\]\\"\\']+/g, "")})
    return filterImages(arr)
  }),
})

function filterImages(images: string[]) {
  //exclude images from certain domains
  return images.filter(image => {
    if (image.toLowerCase().includes("placeimg") || image.toLowerCase().includes("google")) return false
    return z.string().url().safeParse(image).success
  })
}

export const productsSchema = z.preprocess(input => {
  const products = z.array(productSchema).parse(input)
  return products.filter(product => product.images.length > 0)
}, z.array(productSchema))

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.enum(["admin", "customer"]).default("customer"),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().url(),
});

export const usersSchema = z.array(userSchema);


export type User = z.infer<typeof userSchema>;