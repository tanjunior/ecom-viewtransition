import {
  ReactNode,
  createContext,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";

type ScrollContextType = {
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
};

export const ScrollContext = createContext<ScrollContextType | null>(null);

export default function ScrollContextProvider(props: { children: ReactNode }) {
  const [scrollPosition, setScrollPosition] = useState(0);


  return (
    <ScrollContext.Provider value={{ scrollPosition, setScrollPosition }}>
      {props.children}
    </ScrollContext.Provider>
  );
}
