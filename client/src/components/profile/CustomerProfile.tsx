import { NavLink, useParams, useSearchParams } from "react-router-dom";

import { CustomerOrdersHistory } from "./CustomerOrdersHistory";
import { CustomerProfileInfo } from "./CustomerProfileInfo";
import { IUser } from "src/redux/users/user";

type Props = {
  user: IUser;
};

export const CustomerProfile: React.FC<Props> = ({ user }) => {
  const params = useParams();
  const profileID = params.profileID;

  const [searchParams] = useSearchParams();
  const sectionQueryParam = searchParams.get("section");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[rgb(18,18,18)] px-10 py-[7rem] 1024:px-20">
      <div className="h-full w-full rounded-3xl border-b-4 border-l-4 border-[#F83A05] bg-white px-5 py-10 768:px-12 768:py-12 1440:px-20 1440:py-20">
        <div className="flex gap-5 text-xl font-semibold">
          <NavLink
            to={`/profile/${profileID}?section=profile-info`}
            className={`w-[120px] cursor-pointer border-b-4 text-base 540:text-xl ${sectionQueryParam === "profile-info" || sectionQueryParam === null ? "border-b-[#F83A05]" : ""} pb-3`}
          >
            My profile
          </NavLink>
          <NavLink
            to={`/profile/${profileID}?section=orders-history`}
            className={`w-[175px] cursor-pointer border-b-4 text-base 540:text-xl ${sectionQueryParam === "orders-history" ? "border-b-4 border-b-[#F83A05]" : ""} pb-3`}
          >
            Orders history
          </NavLink>
        </div>

        {(sectionQueryParam === "profile-info" ||
          sectionQueryParam === null) && <CustomerProfileInfo user={user} />}
        {sectionQueryParam === "orders-history" && (
          <CustomerOrdersHistory orders={user.orders} />
        )}
      </div>
    </div>
  );
};
