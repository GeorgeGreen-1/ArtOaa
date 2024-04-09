import * as React from "react";

import { cn } from "src/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex rounded-[1.875rem] bg-white text-black shadow-[4px_4px_20px_0_rgba(0,0,0,0.25)]",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const ArtistName = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-[1.25rem] 1280:text-4xl", className)}
    {...props}
  />
));
ArtistName.displayName = "ArtistName";

const ArtistDecription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[0.75rem] 1280:text-base", className)}
    {...props}
  />
));
ArtistDecription.displayName = "ArtistDecription";

const ArtistImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img ref={ref} className={cn("rounded-[1.875rem]", className)} {...props} />
));

ArtistImage.displayName = "ArtistImage";

const GenreWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      " flex w-fit flex-wrap gap-[0.625rem]  1280:gap-x-[0.625rem] 1280:gap-y-5",
      className,
    )}
    {...props}
  />
));

GenreWrapper.displayName = "GenreWrapper";

const GenreCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-[1.5rem] items-center justify-center rounded-[0.625rem] bg-[#1A1A1A] px-[12px] 768:h-8 768:w-[5.5rem] 768:px-0 834:w-[6.3rem] 1024:w-[8rem] 1280:h-10",
      className,
    )}
    {...props}
  />
));

GenreCard.displayName = "GenreCard";

const GenreParagpraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.75rem] font-semibold text-white 1280:text-base",
      className,
    )}
    {...props}
  />
));

GenreParagpraph.displayName = "GenreParagpraph";

const ArtistInfoWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-8 px-5 pb-10 pt-3", className)}
    {...props}
  />
));

ArtistInfoWrapper.displayName = "ArtistInfoWrapper";

const ArtistTextWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-2", className)} {...props} />
));

ArtistTextWrapper.displayName = "ArtistTextWrapper";

const HelperDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));

HelperDiv.displayName = "HelperDiv";
export {
  Card,
  HelperDiv,
  ArtistName,
  ArtistDecription,
  ArtistInfoWrapper,
  ArtistTextWrapper,
  GenreParagpraph,
  GenreWrapper,
  GenreCard,
  ArtistImage,
};
