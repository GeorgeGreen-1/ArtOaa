import { useSearchParams } from "react-router-dom";

import { PersonalProfile } from "./PersonalProfile";
import { SecurityProfile } from "./SecurityProfile";

export const EditProfile = () => {
  const [searchParams] = useSearchParams();

  const sectionQueryParam = searchParams.get("section");
  return (
    <div className="h-full w-full space-y-8 bg-[#121212] px-5 py-[5rem] 768:px-16 1024:px-20">
      <PersonalProfile />
      {(sectionQueryParam === "main-info" || sectionQueryParam === null) && (
        <SecurityProfile />
      )}
    </div>
  );
};
