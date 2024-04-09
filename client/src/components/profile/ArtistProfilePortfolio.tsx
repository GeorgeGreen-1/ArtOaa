import React from "react";
import useWindowSize from "src/hooks/useWindowSize";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "src/redux/auth/authSlice";

import { IUser } from "src/redux/users/user";

type Props = {
  user: IUser;
};

export const ArtistProfilePortfolio: React.FC<Props> = ({ user }) => {
  const { width } = useWindowSize();

  const loggedUser = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  return (
    <div className="h-full w-full border-b-4 border-l-4 border-r-0 border-t-0 border-[#F83A05] py-8 834:px-20 1440:rounded-[2rem] 1440:bg-white">
      {width >= 1440 && (
        <h1 className="mb-[3.75rem] w-fit self-start rounded-br-sm border-b-4 border-[#F83A05] pr-[2rem] text-4xl">
          Portfolio
        </h1>
      )}

      <div className="grid h-full w-full grid-cols-1 gap-5 834:grid-cols-2">
        {loggedUser?._id === user._id && (
          <div
            onClick={() => navigate("/upload-project")}
            className="flex min-h-[20rem] cursor-pointer flex-col items-center justify-center gap-5 rounded-[2rem] border border-[#5E5E5E] bg-white hover:bg-[#5e5e5e]/40"
          >
            <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.4rem] bg-black text-2xl font-bold text-white">
              +
            </div>
            <div className="rounded-xl border border-[#5e5e5e] px-5 py-1 text-[#666666] ">
              Add works
            </div>
          </div>
        )}

        {user.personalProjects &&
          user.personalProjects.map((project) => (
            <div key={project._id} className="h-full w-full">
              <img
                className="min-h-[20rem] w-full rounded-[2rem]"
                src={project.path}
                alt={project._id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
