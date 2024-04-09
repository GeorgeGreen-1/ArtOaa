import { NavLink } from "react-router-dom";

import { ILoggedUser } from "src/redux/auth/auth";

import { IconPerson } from "src/components/icons";

type NavbarProfileProps = {
  loggedUser: ILoggedUser;
  onLogout: () => void;
  closeProfile: () => void;
};

export const NavbarProfile: React.FC<NavbarProfileProps> = ({
  onLogout,
  loggedUser,
  closeProfile,
}) => {
  return (
    <>
      <div className="flex items-center gap-7 border-b-2 border-[#F83A05] px-2 py-6 768:px-3 768:py-8 1280:flex-col 1280:gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D9D9D9] 768:h-24 768:w-24">
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
        <h3 className="line-clamp-2 text-white 768:text-xl 1280:text-lg">
          {loggedUser?.firstName} {loggedUser?.lastName}
        </h3>
      </div>

      <ul className="space-y-5 border-b-2 border-[#F83A05] px-1 py-5 text-white 768:space-y-7 768:px-3 768:py-7 768:text-xl 1280:space-y-5 1280:px-6 1280:py-5 1280:text-base">
        <li>
          <NavLink
            onClick={closeProfile}
            to={`/profile/${loggedUser._id}`}
            className={({ isActive }) =>
              `cursor-pointer hover:text-[#FCA311] ${isActive ? "text-[#FCA311]" : "text-white"}`
            }
          >
            See my profile
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={closeProfile}
            to={"/edit-profile"}
            className={({ isActive }) =>
              `cursor-pointer hover:text-[#FCA311] ${isActive ? "text-[#FCA311]" : "text-white"}`
            }
          >
            Edit profile
          </NavLink>
        </li>
      </ul>

      <div className="px-1 py-5 text-white 768:px-3 768:py-7 768:text-xl 1280:px-6 1280:py-5 1280:text-base">
        <p onClick={onLogout} className="cursor-pointer hover:text-[#FCA311]">
          Sign out
        </p>
      </div>
    </>
  );
};
