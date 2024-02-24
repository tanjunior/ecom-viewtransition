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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { loginLoader } from "@/lib/loaders";
import { usersQuery } from "@/lib/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

const loginFormSchema = userSchema.pick({
  password: true,
  username: true,
});
export type Login = z.infer<typeof loginFormSchema>;

export default function LoginComponent() {
  const { initialData } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loginLoader>>
  >;
  const { data: users } = useSuspenseQuery({
    ...usersQuery(),
    initialData,
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm<Login>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: Login) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    const loggedIn = await login(values);
    if (!loggedIn) return;
    navigate("/");
  }

  return (
    <>
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-black">
        Login
      </h2>
      <Card className="w-full">
        <CardHeader>
          <Select
            onValueChange={(e) => {
              form.setValue("username", users[parseInt(e)].username);
              form.setValue("password", users[parseInt(e)].password);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select existing user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user, i) => (
                <SelectItem key={user.id} value={i.toString()}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
          >
            Register
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
