import { useParams } from "react-router-dom";
import { ArtistProfile } from "./ArtistProfile";
import { CustomerProfile } from "./CustomerProfile";
import { useGetUserByIDQuery } from "src/redux/users/usersApiSlice";
import { Loading } from "src/components/ui";
import { NotFoundPage } from "src/pages";

export const Profile = () => {
  const params = useParams();

  const { data: user, isFetching } = useGetUserByIDQuery(`${params.profileID}`);

  if (isFetching) return <Loading />;
  if (!user) return <NotFoundPage />;

  return (
    <>
      {user?.role === "customer" && <CustomerProfile user={user} />}
      {user?.role === "artist" && <ArtistProfile user={user} />}
    </>
  );
};
