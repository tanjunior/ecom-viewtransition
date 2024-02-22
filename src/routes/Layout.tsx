import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "./Section";

export default function Layout() {
  return (
    <>
      <Header />
        <Section>
          <Outlet />
        </Section>
      <Footer />
    </>
  );
}
