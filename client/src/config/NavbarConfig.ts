type INavbarConfig = {
  id: number;
  title: string;
  link: string;
};

export const NavbarConfig: INavbarConfig[] = [
  { id: 0, title: "Home", link: "/" },
  { id: 1, title: "Artists", link: "/artists" },
  { id: 2, title: "Orders", link: "/orders" },
  { id: 3, title: "About", link: "/about" },
  { id: 4, title: "Contact", link: "/contact" },
  { id: 5, title: "Services", link: "/services" },
];
