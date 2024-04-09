import { VariantProps, cva } from "class-variance-authority";
import { ReactNode, FC } from "react";
import { cn } from "src/lib/utils";

const sidebarVariants = cva(
  "fixed h-screen bg-black transition-all duration-300 z-50 overflow-hidden",
  {
    variants: {
      variant: {
        right: `top-0 right-[-100%] data-[state=open]:right-0`,
        left: `top-0 left-[-100%] data-[state=open]:left-0`,
        top: `left-0 top-[-100%] data-[state=open]:top-0`,
        bottom: `left-0 bottom-[-100%] data-[state=open]:bottom-0`,
      },
      size: {
        full: "w-full",
        "3/4": "w-3/4",
        half: "w-1/2",
        quarter: "w-1/4",
        responsive: "w-full 1024:w-[60%] 1440:w-[40%]",
      },
    },
    defaultVariants: {
      variant: "right",
      size: "full",
    },
  },
);

interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  children: ReactNode;
  state: string;
  showOverlay?: boolean;
  closeMenu?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  children,
  variant,
  size,
  state,
  showOverlay,
  closeMenu,
}) => {
  return (
    <>
      {showOverlay && state === "open" && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black opacity-50"
        ></div>
      )}
      <div
        data-state={state}
        className={cn(sidebarVariants({ variant, size }))}
      >
        {children}
      </div>
    </>
  );
};
