import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "src/components/layout/root";

export function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="mt-28 768:mt-36">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
