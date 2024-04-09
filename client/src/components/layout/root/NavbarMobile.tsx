import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  IconBurgerButton,
  IconCross,
  IconNotification,
  IconPerson,
} from "src/components/icons";

import { Sidebar } from "src/components/ui";
import { useLogoutMutation } from "src/redux/auth/authApiSlice";
import { selectCurrentUser } from "src/redux/auth/authSlice";
import { NavbarProfile } from "./NavbarProfile";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarNotification } from "./NavbarNotification";
import { useSidebar } from "src/hooks/useSidebar";

export const NavbarMobile = () => {
  const {
    sidebarState: burgerMenuState,
    openSidebar: openBurgerMenu,
    closeSidebar: closeBurgerMenu,
  } = useSidebar();

  const {
    sidebarState: profileMenuState,
    openSidebar: openProfileMenu,
    closeSidebar: closeProfileMenu,
  } = useSidebar();

  const {
    sidebarState: notificationsState,
    openSidebar: openNotifications,
    closeSidebar: closeNotifications,
  } = useSidebar();

  const navigate = useNavigate();
  const loggedUser = useSelector(selectCurrentUser);
  const [logOut] = useLogoutMutation();

  const onNavigateToHome = () => navigate("/");

  const onLogout = async () => {
    await logOut(undefined);
    onNavigateToHome();
    closeProfileMenu();
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div
        onClick={onNavigateToHome}
        className="h-[4rem] w-[4.8rem] 768:h-[5rem] 768:w-[6rem]"
      >
        <img
          src="/assets/images/shared/artoa-logo.png"
          alt="artoa logo"
          className="h-full w-full"
        />
      </div>

      <div className="flex items-center gap-3 768:gap-5">
        {loggedUser && (
          <div onClick={openNotifications} className="cursor-pointer">
            <IconNotification />
          </div>
        )}

        {loggedUser && (
          <div
            onClick={openProfileMenu}
            className="flex h-[1.875rem] w-[1.875rem] cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9] 768:h-14 768:w-14"
          >
            {loggedUser.profileImage ? (
              <img
                src={loggedUser.profileImage}
                alt={loggedUser.firstName}
                className="h-full w-full rounded-full"
              />
            ) : (
              <IconPerson />
            )}
          </div>
        )}

        <div onClick={openBurgerMenu} className="cursor-pointer">
          <IconBurgerButton />
        </div>
      </div>

      <NavbarMobileMenu
        burgerMenuState={burgerMenuState}
        closeBurgerMenu={closeBurgerMenu}
        loggedUser={loggedUser}
      />

      {loggedUser && (
        <Sidebar
          state={profileMenuState === "open" ? "open" : "closed"}
          variant="top"
        >
          <div className="no-scrollbar h-full overflow-y-auto bg-[#121212] px-10 1024:px-20">
            <div className="flex h-28 w-full items-center justify-between 768:h-36">
              <div className="h-[4rem] w-[4.8rem] 768:h-[5rem] 768:w-[6rem]">
                <img
                  src="/assets/images/shared/artoa-logo.png"
                  alt="artoa logo"
                  className="h-full w-full"
                />
              </div>
              <div className="cursor-pointer" onClick={closeProfileMenu}>
                <IconCross />
              </div>
            </div>

            <NavbarProfile
              loggedUser={loggedUser}
              onLogout={onLogout}
              closeProfile={closeProfileMenu}
            />
          </div>
        </Sidebar>
      )}

      {loggedUser && (
        <Sidebar
          state={notificationsState === "open" ? "open" : "closed"}
          variant="top"
        >
          <div className="modal-scrollbar h-full overflow-y-scroll bg-[#121212] px-10 1024:px-20">
            <div className="flex h-28 w-full items-center justify-between 768:h-36">
              <div className="h-[4rem] w-[4.8rem] 768:h-[5rem] 768:w-[6rem]">
                <img
                  src="/assets/images/shared/artoa-logo.png"
                  alt="artoa logo"
                  className="h-full w-full"
                />
              </div>
              <div className="cursor-pointer" onClick={closeNotifications}>
                <IconCross />
              </div>
            </div>

            <div className="space-y-5 pb-5">
              {loggedUser.notifications.length > 0 ? (
                loggedUser.notifications.map((notification) => (
                  <NavbarNotification
                    key={notification._id}
                    notification={notification}
                    onClose={() => closeNotifications()}
                  />
                ))
              ) : (
                <div className="pt-44 text-center">
                  <span className=" text-3xl text-white">
                    Notifications are empty
                  </span>
                </div>
              )}
            </div>
          </div>
        </Sidebar>
      )}
    </div>
  );
};
