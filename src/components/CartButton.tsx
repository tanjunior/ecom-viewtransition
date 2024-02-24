import useCart from "@/hooks/useCart";
import Icons from "./Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CartButton() {
  const { cart } = useCart()
  
  return (
    <div className="relative h-10">
      <Icons.cart className="h-full stroke-primary size-auto" />
      
      <Avatar key={Math.random()} className="text-[12px] size-6 absolute -right-1 -top-1 animate-cart ">
        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
        <AvatarFallback>{cart.length}</AvatarFallback>
      </Avatar>

    
    </div>
  )
}
