import { NavLink, useNavigate } from "react-router-dom";
import { IconCross } from "src/components/icons";
import { LangSwitcher } from "src/components/shared";
import { Button, Sidebar } from "src/components/ui";
import { NavbarConfig } from "src/config/NavbarConfig";
import { ILoggedUser } from "src/redux/auth/auth";

type Props = {
  burgerMenuState: string | null;
  closeBurgerMenu: () => void;
  loggedUser: ILoggedUser | null;
};

export const NavbarMobileMenu: React.FC<Props> = ({
  burgerMenuState,
  closeBurgerMenu,
  loggedUser,
}) => {
  const navigate = useNavigate();

  const onNavigateToLogin = () => navigate("/auth/login");
  const onNavigateToRegister = () => navigate("/auth/register");

  return (
    <Sidebar state={burgerMenuState === "open" ? "open" : "closed"}>
      <div className="no-scrollbar h-full overflow-y-auto 540:pb-10">
        <div className="flex h-28 w-full items-center justify-between px-10 768:h-36 1024:px-20">
          <div className="h-[4rem] w-[4.8rem] 768:h-[5rem] 768:w-[6rem]">
            <img
              src="/assets/images/shared/artoa-logo.png"
              alt="artoa logo"
              className="h-full w-full"
            />
          </div>
          <div className="flex items-center gap-2 1024:gap-10">
            <LangSwitcher />
            <div className="cursor-pointer" onClick={closeBurgerMenu}>
              <IconCross />
            </div>
          </div>
        </div>

        <div>
          <ul className="mb-10 540:mb-20 768:px-10 1024:px-20">
            {NavbarConfig.map((navlink) => (
              <li
                className="cursor-pointer border-b-[3px] border-[#F83A05] py-3 pl-10 font-semibold 540:py-5 540:text-xl 768:w-full"
                key={navlink.id}
              >
                <NavLink
                  onClick={closeBurgerMenu}
                  to={navlink.link}
                  className={({ isActive }) =>
                    `cursor-pointer hover:text-[#FCA311] ${isActive ? "text-[#FCA311]" : "text-white"}`
                  }
                >
                  {navlink.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {!loggedUser && (
            <div className="flex gap-5 px-4 540:gap-8 540:px-10 1024:px-20">
              <Button
                onClick={onNavigateToLogin}
                variant="secondary"
                className="w-full px-10"
              >
                Login
              </Button>
              <Button
                onClick={onNavigateToRegister}
                variant="tertiary"
                className="w-full px-10"
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};
