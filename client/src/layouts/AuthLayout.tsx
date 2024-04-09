import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { IconCross } from "src/components/icons";
import useWindowSize from "src/hooks/useWindowSize";
import { selectCurrentUser } from "src/redux/auth/authSlice";

export function AuthLayout() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const loggedUser = useSelector(selectCurrentUser);

  const onNavigateToHome = () => navigate("/");

  useLayoutEffect(() => {
    if (loggedUser) onNavigateToHome();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <main className="min-h-screen bg-black px-5 py-8 768:flex 768:justify-between 768:gap-3 1024:relative 1024:px-16">
        {width >= 768 && (
          <div
            onClick={onNavigateToHome}
            className="absolute left-5 top-8 cursor-pointer 1024:left-16"
          >
            <IconCross size="20" />
          </div>
        )}
        {width >= 768 && (
          <div className="flex items-center">
            <p className="text-2xl text-[#FCA311] 1024:text-4xl">
              Design with us to unlock your creativity
            </p>
          </div>
        )}
        <Outlet />
      </main>
    </>
  );
}
