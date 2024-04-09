import { NavLink, useSearchParams } from "react-router-dom";
import { MainInfo } from "./MainInfo";
import { PortfolioInfo } from "./PortfolioInfo";
import { PaymentInfo } from "./PaymentInfo";
import { selectCurrentUser } from "src/redux/auth/authSlice";
import { useSelector } from "react-redux";
import useWindowSize from "src/hooks/useWindowSize";

export const PersonalProfile = () => {
  const loggedUser = useSelector(selectCurrentUser);
  const [searchParams] = useSearchParams();

  const { width } = useWindowSize();
  const sectionQueryParam = searchParams.get("section");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20 rounded-3xl border-b-4 border-l-4 border-[#F83A05] bg-white px-5 py-10 768:px-12 768:py-12 1440:px-20 1440:py-20">
      <div className="flex h-full w-full flex-col gap-5 768:w-[38rem] 834:w-[40rem] 1024:w-[45rem] 1280:w-[50rem] 1440:w-[60rem] 1536:w-[62rem] 1592:w-[65rem]">
        <div className="flex w-full self-start">
          <h1 className="text-xl text-[#F83A05] 768:text-2xl">
            Personal Profile
          </h1>
        </div>
        <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6666664f] px-2 py-2">
          <NavLink
            to="/edit-profile?section=main-info"
            className={`flex w-full items-center justify-center rounded-md ${sectionQueryParam === "main-info" || sectionQueryParam === null ? "bg-white" : ""} px-2 py-2 text-black`}
          >
            <h1>{width > 768 ? "Main Info" : "Main"}</h1>
          </NavLink>
          <NavLink
            to="/edit-profile?section=payment-info"
            className={`flex w-full items-center justify-center rounded-md ${sectionQueryParam === "payment-info" ? "bg-white" : ""} px-2 py-2 text-black`}
          >
            <h1>{width > 768 ? "Payment Info" : "Payment"}</h1>
          </NavLink>

          {loggedUser?.role === "artist" && (
            <NavLink
              to="/edit-profile?section=portfolio-info"
              className={`flex w-full items-center justify-center rounded-md ${sectionQueryParam === "portfolio-info" ? "bg-white" : ""} px-2 py-2 text-black`}
            >
              <h1>{width > 768 ? "Portfolio Info" : "Portfolio"}</h1>
            </NavLink>
          )}
        </div>
      </div>
      {(sectionQueryParam === "main-info" || sectionQueryParam === null) && (
        <MainInfo />
      )}

      {loggedUser?.role === "artist" &&
        sectionQueryParam === "portfolio-info" && <PortfolioInfo />}

      {sectionQueryParam === "payment-info" && <PaymentInfo />}
    </div>
  );
};
