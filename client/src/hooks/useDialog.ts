import { useEffect, useState } from "react";

export const useDialog = () => {
  const [dialogState, setDialogState] = useState<"open" | "closed">("closed");

  const openDialog = () => {
    setDialogState("open");
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    setDialogState("closed");
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    window.addEventListener("resize", closeDialog);

    return () => {
      window.removeEventListener("resize", closeDialog);
      closeDialog();
    };
  }, []);

  return { dialogState, openDialog, closeDialog };
};
