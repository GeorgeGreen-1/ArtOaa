import { Button } from "src/components/ui";
import useProgressiveImage from "src/hooks/useProgressiveImage";

export const HomeHero = () => {
  const sourceLoaded = useProgressiveImage(
    "/assets/images/home/home-hero-bg.png",
  );

  return (
    <div
      style={{
        backgroundImage: `url(${sourceLoaded})`,
        backgroundSize: "cover",
        backgroundColor: sourceLoaded ? "" : "#121212", // Set background color to #FAA32F if image is not loaded
      }}
      className="flex h-full w-full flex-col gap-10 bg-cover px-10 pb-[3.8125rem] pt-10 text-left text-white 1280:gap-5 1280:px-[8.75rem] 1280:py-[6.0625rem]"
    >
      <h1 className="text-4xl 834:text-[2.5rem] 1280:text-6xl">
        Discover the imaginary world
      </h1>
      <hr className="max-w-[65.43rem] rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
      <p className="max-w-[40rem] text-base 834:mb-[3.75rem] 834:max-w-[85.25rem] 834:text-[1.25rem] 1280:text-4xl">
        Instantly transform any space with ourI-powered art generator. Connect
        with artists globally for unique creations. Legal, creative, and
        community-centric. ArtOa.io — Where Walls Speak.
      </p>
      <div className="flex flex-col items-start  gap-10 font-bold 834:flex-row 834:gap-[0.625rem]">
        <Button variant="primary">Join as artist</Button>
        <Button variant="primary">Join as customer</Button>
      </div>
    </div>
  );
};
