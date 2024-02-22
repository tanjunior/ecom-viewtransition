import { z } from "zod";

export type Product = z.infer<typeof productSchema>;

const imageSchema = z.string().url()

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
  images: z.preprocess(images => {
    const result = z.array(z.string()).parse(images)
    return result.filter(image => imageSchema.safeParse(image).success)
  }, z.array(imageSchema))
})

export const productsSchema = z.array(productSchema)