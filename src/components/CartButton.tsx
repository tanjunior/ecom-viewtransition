import useCart from "@/hooks/useCart";
import Icons from "./Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link } from "react-router-dom";

export default function CartButton() {
  const { cart } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Drawer direction={isDesktop ? "right" : "bottom"}>
      <DrawerTrigger>
        <div className="relative h-10">
          <Icons.cart className="h-full stroke-primary size-auto" />

          <Avatar
            key={Math.random()}
            className="text-[12px] size-6 absolute -right-1 -top-1 animate-cart "
          >
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{cart.length}</AvatarFallback>
          </Avatar>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your cart</DrawerTitle>
        </DrawerHeader>
        <div className="grid gap-4 p-4">
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  alt="Product image"
                  className="object-cover rounded-lg aspect-square"
                  height="100"
                  src={item.image}
                  width="100"
                />
                <div className="flex-col gap-1 text-sm">
                  <h4 className="font-semibold">{item.title}</h4>
                  <div>${item.price}</div>
                </div>
                <div className="ml-auto">{item.quantity}</div>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button asChild>
              <Link to="/account/cart">Go to Cart</Link>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
