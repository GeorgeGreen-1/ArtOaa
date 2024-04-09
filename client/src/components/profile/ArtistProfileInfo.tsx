import { IUser } from "src/redux/users/user";

import { StarRating } from "src/components/shared";
import {
  GenreCard,
  GenreParagpraph,
  GenreWrapper,
} from "src/components/ui/ArtistCard";

import { IconDefaultProfile, IconLocation } from "src/components/icons";

type Props = {
  user: IUser;
};

export const ArtistProfileInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex h-full min-w-[15rem] flex-col items-center justify-center gap-5 rounded-[1.875rem] border-b-4 border-l-4 border-r-0 border-t-0 border-[#F83A05] bg-white px-5 py-[3rem] 768:min-w-[25rem] 768:gap-7">
      <div className="flex h-[9.125rem] w-[9.125rem] items-center justify-center rounded-[50%] bg-[#D9D9D9] 1024:rounded-[1.5625rem] 1280:h-[11.9375rem] 1280:w-[12.25rem]">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.firstName}
            className="h-full w-full rounded-[50%] 1024:rounded-[1.5625rem]"
          />
        ) : (
          <IconDefaultProfile />
        )}
      </div>

      <h1 className="self-center text-2xl">
        {user?.firstName} {user?.lastName}
      </h1>

      <h1 className="text-xl">Artist</h1>
      <div className="flex items-center justify-center gap-2">
        <IconLocation />
        <p className="text-base">Location</p>
      </div>
      <div className="max-w-[23rem] self-center rounded-[0.875rem] border border-[#666]/80 px-5 py-[0.625rem]">
        <p className="text-base">{user?.aboutMe}</p>
      </div>
      <GenreWrapper className="items-center justify-center">
        {user?.artStyle?.map((style) => (
          <GenreCard key={style._id}>
            <GenreParagpraph>{style.name}</GenreParagpraph>
          </GenreCard>
        ))}
      </GenreWrapper>
      <div className="flex w-full items-center justify-around">
        <StarRating />
        <p className="text-[0.75rem]">26 project</p>
      </div>
      <p className="text-[0.75rem]">MEMBER SINCE:DECEMBER 18, 2023</p>
    </div>
  );
};
