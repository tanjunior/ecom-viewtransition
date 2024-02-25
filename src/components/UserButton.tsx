import useAuth from "@/hooks/useAuth";
import Icons from "./Icons";
import { Link } from "react-router-dom";

export default function UserButton() {
  const { user } = useAuth();

  return (
    <Link
      to={user ? "/account/profile" : "/login"}
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
  );
}
