import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Icons from "./Icons";

export default function Header() {
  const {user} = useAuth()
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex flex-wrap items-center justify-between w-full max-w-screen-lg px-6 py-6 mx-auto lg:px-0">
        <>
          <Link
            className="flex items-center text-xl font-bold tracking-tight text-black no-underline hover:no-underline"
            to="/"
            unstable_viewTransition
            style={{ viewTransitionName: "header" }}
          >
            <span className="inline-block pl-2">Da Store</span>
          </Link>
        </>
        
        <Link
          to={user ? "/account" : "/login"}
          unstable_viewTransition
          style={{ viewTransitionName: "login" }}
        >
          {user ? <strong className="flex">{user.username}<Icons.user /></strong> : "Login"}

        </Link>
      </div>
    </nav>
  );
}
