import { useEffect, useState } from "react";

export const useSidebar = () => {
  const [sidebarState, setSidebarState] = useState<"open" | "closed">("closed");

  const openSidebar = () => {
    setSidebarState("open");
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    setSidebarState("closed");
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    window.addEventListener("resize", closeSidebar);

    return () => {
      window.removeEventListener("resize", closeSidebar);
      closeSidebar();
    };
  }, []);

  return { sidebarState, openSidebar, closeSidebar };
};
