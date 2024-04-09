import { IUser } from "src/redux/users/user";
import { ArtistProfileInfo } from "./ArtistProfileInfo";
import { ArtistProfilePortfolio } from "./ArtistProfilePortfolio";

type Props = {
  user: IUser;
};

export const ArtistProfile: React.FC<Props>  = ({ user }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[#121212] px-10 py-[6.875rem] 1280:px-[8.75rem] 1440:flex-row 1440:items-start 1440:gap-10">
      <ArtistProfileInfo user={user} />
      <ArtistProfilePortfolio user={user} />
    </div>
  );
};
