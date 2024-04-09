import { Outlet } from "react-router-dom";
import { useGetLoggedUserQuery } from "src/redux/auth/authApiSlice";
import { Loading } from "src/components/ui";

export const TryAuth = () => {
  const { isFetching } = useGetLoggedUserQuery();

  if (isFetching) return <Loading />;

  return <Outlet />;
};
