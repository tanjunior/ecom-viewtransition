import { User } from "@/lib/types";
import {
  ReactNode,
  createContext,
  useState,
  type SetStateAction,
  type Dispatch,
  useEffect,
} from "react";

type AuthContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect( ()=>{
    async function getSession() {
      try {
        const access_token = localStorage.getItem('access_token')
        if(!access_token) return

        const sessionResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }})
        if (sessionResponse.ok) {
          const user = await sessionResponse.json()
          setUser(user)
        } 
      } catch(err: unknown) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
    }
    getSession()
  }, [])
  
  function logout() {

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }


  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
