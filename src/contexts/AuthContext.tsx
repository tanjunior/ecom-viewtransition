import { User } from "@/lib/types";
import { Login } from "@/routes/Login";
import {
  ReactNode,
  createContext,
  useState,
  type SetStateAction,
  type Dispatch,
  useEffect,
} from "react";

type Session = Pick<User, 'id' | 'username'>

type AuthContextType = {
  user: Session | null;
  setUser: Dispatch<SetStateAction<Session | null>>;
  login: (data: Login) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) return;

    const user = decodeJWT(token);
    setUser(user);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  function decodeJWT(token: string) {
    const tokens = token.split(".");

    const data = JSON.parse(atob(tokens[1]));
    return {id: data.sub, username: data.user}
  }

  async function login(data: Login): Promise<boolean> {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return false;

    const { token } = await response.json();
    localStorage.setItem("token", token);
    const user = decodeJWT(token);
    setUser(user);
    return true;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
