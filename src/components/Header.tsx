import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Icons from "./Icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";import CartButton from "./CartButton";

export default function Header() {
  const { user } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex flex-wrap items-center justify-between w-full max-w-screen-lg px-6 py-6 mx-auto lg:px-0">
        <Link
          className="flex items-center text-xl font-bold tracking-tight text-black no-underline hover:no-underline"
          to="/"
          unstable_viewTransition
          style={{ viewTransitionName: "header" }}
        >
          <span className="inline-block pl-2">Da Store</span>
        </Link>
        <Drawer direction={isDesktop ? "right" : "bottom"}>
          <DrawerTrigger>
            <CartButton />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Link
          to={user ? "/account" : "/login"}
          unstable_viewTransition
          style={{ viewTransitionName: "login" }}
        >
          {user ? (
            <strong className="flex">
              {user.username}
              <Icons.user />
            </strong>
          ) : (
            "Login"
          )}
        </Link>
      </div>
    </nav>
  );
}
