import useWindowSize from "src/hooks/useWindowSize";

import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";

export const Navbar = () => {
  const { width } = useWindowSize();

  return (
    <header className="fixed left-0 top-0 z-30 flex h-28 w-full items-center bg-black px-10 768:h-36 1024:px-20">
      {width >= 1280 ? <NavbarDesktop /> : <NavbarMobile />}
    </header>
  );
};
