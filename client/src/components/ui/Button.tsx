import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "src/lib/utils";

const buttonVariants = cva(
  "h-16 inline-flex items-center justify-center px-[3.75rem] whitespace-nowrap rounded-[1.25rem] text-base font-semibold cursor-pointer transition-all duration-300",
  {
    variants: {
      variant: {
        primary:
          "bg-[#FCA311] text-white shadow-[-4px_4px_0_0_rgb(248,58,5)] border-[6px] border-[#FCA311] hover:bg-black hover:text-[#FCA311]",
        secondary:
          "bg-black text-[#FCA311] border border-[#FCA311] border-[3px]",
        tertiary: "bg-[#FCA311] text-black ",
        quaternary: "bg-transparent border-2 border-[#F83A05] text-[#F83A05]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
