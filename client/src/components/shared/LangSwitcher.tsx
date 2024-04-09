import { useState } from "react";
import { cn } from "src/lib/utils";

export const LangSwitcher = () => {
  const [language, setLanguage] = useState<"ka" | "eng">("ka");

  const handleSwitch = () => {
    setLanguage(language === "ka" ? "eng" : "ka");
  };

  return (
    <div
      onClick={handleSwitch}
      className={cn(
        "inline-flex h-8 w-[4.625rem] scale-75 cursor-pointer items-center rounded-full border-2 border-transparent px-[3px] transition-colors 1024:scale-100",
        {
          "bg-[#EFEFEF]": language === "ka",
          "bg-[#FAA32F]": language === "eng",
        },
      )}
    >
      <div
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-center shadow-lg ring-0 transition-transform",
          {
            "translate-x-0 bg-[url('/assets/images/shared/georgia-flag.png')]":
              language === "ka",
            "translate-x-[2.6875rem] bg-[url('/assets/images/shared/britain-flag.png')]":
              language === "eng",
          },
        )}
      ></div>
    </div>
  );
};
