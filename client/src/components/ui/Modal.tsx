import { ReactNode, FC } from "react";
import { cn } from "src/lib/utils";

type ModalProps = {
  children: ReactNode;
  closeDialog: () => void;
  isModalOpen: boolean;
};

export const Modal: FC<ModalProps> = ({
  children,
  closeDialog,
  isModalOpen,
}) => {
  return (
    <div
      onClick={closeDialog}
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-black/80 opacity-100 transition-opacity duration-400",
        {
          "pointer-events-none opacity-0": !isModalOpen,
        },
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="opacity-100 transition-opacity"
      >
        {children}
      </div>
    </div>
  );
};
