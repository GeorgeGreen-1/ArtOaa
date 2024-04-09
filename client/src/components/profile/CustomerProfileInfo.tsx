import { IUser } from "src/redux/users/user";
import { IconDefaultProfile } from "src/components/icons";

type Props = {
  user: IUser;
};

export const CustomerProfileInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="mt-16 flex h-full w-full flex-col items-center justify-center gap-10 1280:flex-row  1280:items-start 1280:justify-start">
      <div className="flex h-[9.125rem] w-[9.125rem] items-center justify-center rounded-[50%] bg-[#D9D9D9] 768:h-[12rem] 768:w-[12rem] 768:rounded-[1.5625rem] 1280:h-[18.9375rem] 1280:w-[18.25rem]">
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
      <div className="flex flex-row gap-1 py-10 text-base text-[#F83A05] 540:text-lg">
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
      </div>
    </div>
  );
};
