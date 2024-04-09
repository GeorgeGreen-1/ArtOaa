import useProgressiveImage from "src/hooks/useProgressiveImage";

export const HomeFeaturesDesktop = () => {
  const sourceLoaded = useProgressiveImage(
    "/assets/images/home/home-features-desktop.png",
  );

  return (
    <div
      style={{
        backgroundImage: `url(${sourceLoaded})`,
        backgroundSize: "cover",
        backgroundColor: sourceLoaded ? "" : "#121212", // Set background color to #FAA32F if image is not loaded
      }}
      className="relative h-[60.4375rem] w-full bg-cover bg-no-repeat py-[4.375rem] text-white"
    >
      <div className="ml-[4.375rem] flex flex-col gap-5 rounded-[1.875rem] bg-gradient-to-b from-[#12121260] via-[#12121260] to-transparent text-left 834:w-[75%] 834:px-[1.875rem] 834:py-[1.875rem] 1280:w-[40%] 1280:px-[4.375rem] 1280:py-[4.375rem]">
        <h1 className="font-bold 834:text-[1.625rem] 1280:text-[2.875rem]">
          AI/AR Order Generator
        </h1>
        <hr className="max-w-[40rem] rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
        <p className="font-semibold 834:text-lg 1280:text-[1.625rem]">
          Our AI/AR technology will generate variations in 1 minute that will be
          placed on the wall in the future through the artist's unique talent.
          Use our technology to bring ideas to life.
        </p>
      </div>
      <div className="absolute right-0 w-[40%] 834:top-[18rem] 1280:top-[8.3125rem]">
        <h1 className="ml-5 font-bold 834:text-[1.625rem]  1280:text-[2.875rem]">
          Order Process
        </h1>
        <hr className="w-full rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
      </div>
      <div className="absolute left-0 flex w-[35%] flex-col 834:bottom-[25rem] 1280:bottom-[10.3125rem]">
        <h1 className="mr-5 self-end font-bold 834:text-[1.625rem] 1280:text-[2.875rem]">
          Pricing Models
        </h1>
        <hr className="w-full rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
      </div>
      <div className="absolute bottom-[5.4375rem] right-[4.375rem] ml-[4.375rem] flex flex-col  gap-5 rounded-[1.875rem] bg-gradient-to-b from-[#12121260] via-[#12121260] to-transparent text-left 834:w-[60%] 834:px-[1.875rem] 834:py-[1.875rem] 1280:w-[40%] 1280:px-[4.375rem] 1280:py-[4.375rem]">
        <h1 className="font-bold 834:text-[1.625rem]  1280:text-[2.875rem]">
          Reduced time and costs
        </h1>
        <hr className="max-w-[40rem] rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
        <p className="font-semibold 834:text-lg 1280:text-[1.625rem]">
          Results obtained in minimum time, reduced costs and high quality.
        </p>
      </div>
    </div>
  );
};
