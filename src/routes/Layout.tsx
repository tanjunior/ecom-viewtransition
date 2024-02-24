import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container flex flex-col flex-wrap items-start max-w-screen-lg px-6 pt-8 pb-12 mx-auto overflow-hidden lg:px-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
