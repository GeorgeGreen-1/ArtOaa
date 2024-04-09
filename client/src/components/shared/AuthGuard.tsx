import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "src/redux/auth/authSlice";

export const AuthGuard = () => {
  const loggedUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!loggedUser) navigate("/");

    // eslint-disable-next-line
  }, []);

  return <Outlet />;
};
