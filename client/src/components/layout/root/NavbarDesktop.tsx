import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { useCloseOnOutsideClick } from "src/hooks/useCloseOnOutsideClick";
import { useLogoutMutation } from "src/redux/auth/authApiSlice";
import { selectCurrentUser } from "src/redux/auth/authSlice";

import { LangSwitcher } from "src/components/shared";
import { Button } from "src/components/ui";
import { IconNotification, IconPerson } from "src/components/icons";
import { NavbarProfile } from "./NavbarProfile";

import { NavbarConfig } from "src/config/NavbarConfig";
import { NavbarNotification } from "./NavbarNotification";

export const NavbarDesktop = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector(selectCurrentUser);
  const [logOut] = useLogoutMutation();

  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const personIconRef = useRef<HTMLDivElement | null>(null);

  const [isNotificationsVisible, setIsNotificationsVisible] =
    useState<boolean>(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const notificationsIconRef = useRef<HTMLDivElement | null>(null);

  useCloseOnOutsideClick([profileRef, personIconRef], () =>
    setIsProfileVisible(false),
  );

  useCloseOnOutsideClick([notificationsRef, notificationsIconRef], () =>
    setIsNotificationsVisible(false),
  );

  const onNavigateToLogin = () => navigate("/auth/login");
  const onNavigateToRegister = () => navigate("/auth/register");
  // const onNavigateToUploadProject = () => navigate("/upload-project");
  const onNavigateToHome = () => navigate("/");

  const onLogout = async () => {
    await logOut(undefined);
    onNavigateToHome();
    setIsProfileVisible(false);
  };

  return (
    <div className="relative flex w-full justify-between">
      <div
        onClick={onNavigateToHome}
        className="flex h-[5rem] w-[6rem] cursor-pointer items-center"
      >
        <img
          src="/assets/images/shared/artoa-logo.png"
          alt="artoa logo"
          className="h-full w-full"
        />
      </div>

      <ul className="flex items-center gap-8 text-white 1536:gap-10">
        {NavbarConfig.map((navlink) => (
          <li className="cursor-pointer" key={navlink.id}>
            <NavLink
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

      <div className="flex items-center gap-8">
        {!loggedUser && (
          <div className="flex items-center gap-5">
            <Button onClick={onNavigateToLogin} variant="secondary">
              Login
            </Button>
            <Button onClick={onNavigateToRegister} variant="tertiary">
              Sign up
            </Button>
          </div>
        )}

        {loggedUser && (
          <div className="flex items-center gap-8">
            {/* {loggedUser.role === "artist" && (
              <Button
                onClick={onNavigateToUploadProject}
                variant="tertiary"
                className="h-7 rounded-lg px-4 text-xs text-white"
              >
                Share Your Work
              </Button>
            )} */}

            <div
              ref={notificationsIconRef}
              onClick={() => setIsNotificationsVisible((prev) => !prev)}
              className="cursor-pointer"
            >
              <IconNotification />
            </div>

            <div
              ref={personIconRef}
              onClick={() => setIsProfileVisible((prev) => !prev)}
              className="flex size-[3.75rem] cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9]"
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
          </div>
        )}

        <LangSwitcher />
      </div>

      {loggedUser && isProfileVisible && (
        <div
          ref={profileRef}
          className="absolute right-0 top-[5rem] w-[20rem] rounded-lg bg-[#121212]"
        >
          <NavbarProfile
            loggedUser={loggedUser}
            onLogout={onLogout}
            closeProfile={() => setIsProfileVisible((prev) => !prev)}
          />
        </div>
      )}

      {loggedUser && isNotificationsVisible && (
        <div
          ref={notificationsRef}
          className="modal-scrollbar absolute right-0 top-[5rem] flex max-h-[31rem] w-[30rem] flex-col gap-5 overflow-y-scroll rounded-2xl bg-[#EFEFEF] px-5 py-6"
        >
          {loggedUser.notifications.length > 0 ? (
            loggedUser.notifications.map((notification) => (
              <NavbarNotification
                key={notification._id}
                onClose={() => setIsNotificationsVisible(false)}
                notification={notification}
              />
            ))
          ) : (
            <span className="self-center text-lg text-[#121212]">
              Notifications are empty
            </span>
          )}
        </div>
      )}
    </div>
  );
};
