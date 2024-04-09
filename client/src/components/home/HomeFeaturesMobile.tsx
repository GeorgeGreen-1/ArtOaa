import useProgressiveImage from "src/hooks/useProgressiveImage";

export const HomeFeaturesMobile = () => {
  const sourceLoaded = useProgressiveImage(
    "/assets/images/home/home-features-mobile.png",
  );

  return (
    <div
      style={{
        backgroundImage: `url(${sourceLoaded})`,
        backgroundSize: "cover",
        backgroundColor: sourceLoaded ? "" : "#121212",
      }}
      className="mt-[-1.8rem] h-full w-full rounded-[2rem] bg-cover px-10 py-[7rem]"
    >
      <div className="flex flex-col rounded-[1.875rem] bg-gradient-to-b from-[#12121260] via-[#12121260] to-transparent px-[0.625rem] py-10 text-left text-white">
        <h1 className="mb-[0.625rem] text-2xl font-bold">
          AI/AR Order Generator
        </h1>
        <hr className="mb-5 max-w-[14.25rem] rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
        <p className="mb-[3.125rem] text-base font-semibold">
          Our AI/AR technology will generate variations in 1 minute that will be
          placed on the wall in the future through the artist's unique talent.
          Use our technology to bring ideas to life.
        </p>
        <h1 className="mb-[0.625rem] text-2xl font-bold">Order Process</h1>
        <hr className="mb-9 max-w-[14.25rem] rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
        <h1 className="mb-[0.625rem] text-2xl font-bold">Pricing Models</h1>
        <hr className="mb-9 max-w-[14.25rem] rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
        <h1 className="mb-[0.625rem] text-2xl font-bold">
          Reduced time and costs
        </h1>
        <hr className="mb-5 max-w-[19.375rem] rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
        <p className="text-base font-semibold">
          Results obtained in minimum time, reduced costs and high quality.
        </p>
      </div>
    </div>
  );
};
