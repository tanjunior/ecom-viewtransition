import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const registerFormSchema = userSchema
  .omit({
    id: true,
    role: true,
    avatar: true,
  })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function RegisterComponent() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");

  async function getRandomAvatar() {
    const response = await fetch(
      "https://randomuser.me/api/?inc=picture&noinfo"
    ).then((response) => response.json());
    const url = response.results[0].picture.large;
    setAvatar(url);
  }

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log({...values, avatar});

    // const checkEmailResponse = await fetch("https://api.escuelajs.co/api/v1/users/is-available", {
    //   method: "POST",
    //   body: JSON.stringify({ email: values.email }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // }).then(response => response.json())

    // console.log(checkEmailResponse)
    // if (!checkEmailResponse.isAvailable) return form.setError("email", { message: "Email is already taken" })

    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      body: JSON.stringify({ ...values, avatar }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      navigate("/login");
    }
  }

  return (
    <>
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-black">
        Register
      </h2>
      <Card className="w-full">
        <CardHeader className="items-center justify-center">
          <Avatar
            className="size-56"
            onClick={async () => {
              await getRandomAvatar();
            }}
          >
            <AvatarImage src={avatar} />
            <AvatarFallback>Click to get random avatar</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="space-x-1">
          <span>Already have an account?</span>
          <Link
            to="/login"
            unstable_viewTransition
            style={{ viewTransitionName: "register-login" }}
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
