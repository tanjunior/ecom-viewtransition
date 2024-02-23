import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  image: z.string().url(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export type Product = z.infer<typeof productSchema>;
export const productsSchema = z.array(productSchema);

export const addressSchema = z.object({
  city: z.string(),
  street: z.string(),
  number: z.number(),
  zipcode: z.string(),
  geolocation: z.object({
    lat: z.string(),
    long: z.string(),
  }),
})

export const nameSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
})

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  name: nameSchema,
  address: addressSchema,
  phone: z.string(),
});

export type User = z.infer<typeof userSchema>;
export const usersSchema = z.array(userSchema);
