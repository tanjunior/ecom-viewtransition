import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { loginLoader } from "@/lib/loaders";
import { usersQuery } from "@/lib/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

const loginFormSchema = userSchema.pick({
  password: true,
  email: true,
})

export default function LoginComponent() {
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loginLoader>>
  >;
  const { data: users } = useSuspenseQuery({
    ...usersQuery(),
    initialData,
  });

  const {state} = useLocation()
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      const {access_token, refresh_token} = await response.json()
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      const sessionResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      })

      if (sessionResponse.ok) {
        const user = await sessionResponse.json()
        setUser(user)
        if (state?.from) return navigate(state.from)
        navigate("/")
      } 
    }
  }

  return (
    <>
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-black">
        Login
      </h2>
      <Card className="w-full">
        <CardHeader>
          <Select onValueChange={e => {
            form.setValue("email", users[parseInt(e)].email)
            form.setValue("password", users[parseInt(e)].password)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {users.map((user, i) => <SelectItem key={user.id} value={i.toString()}>{user.name}({user.role})</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="space-x-1">
          <span>Do not have an account?</span>
          <Link
            to="/register"
            unstable_viewTransition
            style={{ viewTransitionName: "login-register" }}
          >Register</Link>
        </CardFooter>
      </Card>

    </>

  );
}
