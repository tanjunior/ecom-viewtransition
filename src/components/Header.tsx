import { NavLink, Link } from "react-router-dom";
import CartButton from "./CartButton";
import UserButton from "./UserButton";

export default function Header() {
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
        <CartButton />
        <UserButton />
      </div>
    </nav>
  );
}
