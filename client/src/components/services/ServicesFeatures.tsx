export const ServicesFeatures = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-10 bg-[#E5E5E5] px-10 py-10 768:px-20 768:py-20 1440:px-32">
      <h1 className="self-start text-4xl font-bold text-[#FCA311]">
        How it Works:
      </h1>
      <div className="flex h-full w-full flex-col gap-10 768:gap-20">
        <div className="flex h-full w-full flex-col gap-5 768:flex-row 768:items-start 768:gap-10">
          <img
            src="/assets/images/services/services-features-1.png"
            alt="place-your-order"
            className="max-h-[22rem] max-w-[21rem]"
          />
          <div className="flex w-full flex-col gap-5 768:gap-10">
            <h1 className="text-2xl font-bold 768:text-3xl 1280:text-5xl">
              Place Your Order:
            </h1>
            <p className="text-xl font-normal 768:text-2xl 1280:text-3xl">
              Fill out the simple order form, confirm the details and wait for
              the bids.
            </p>
          </div>
        </div>
        <div className="flex  w-full flex-col gap-5 768:gap-10">
          <h1 className="text-2xl font-bold 768:text-3xl 1280:text-5xl">
            AI/AR Order Generator
          </h1>
          <p className="text-xl font-normal 768:text-2xl 1280:text-3xl">
            Our AI/AR technology will generate variations in 1 minute that will
            be placed on the wall in the future through the artist's unique
            talent. Use our technology to bring ideas to life.
          </p>
        </div>
        <div className="flex w-full flex-col gap-5 768:flex-row-reverse 768:items-center 768:gap-10">
          <div className="flex w-full flex-col gap-5 768:gap-10">
            <h1 className="text-2xl font-bold 768:text-3xl 1280:text-5xl">
              Portfolio Evaluation:
            </h1>
            <p className="text-xl font-normal 768:text-2xl 1280:text-3xl">
              Evaluate artists' portfolios in-depth to make sure their style
              matches your expectations.
            </p>
          </div>
          <img
            className="max-h-[15.5rem] max-w-[16rem]"
            alt="portfolio-evaluation"
            src="/assets/images/services/services-features-2.png"
          />
        </div>
        <div className="flex w-full flex-col gap-5 768:gap-10 ">
          <h1 className="text-2xl font-bold 768:text-3xl 1280:text-5xl">
            Check Form Submission And Artist Notification:
          </h1>
          <div className="flex flex-col 768:flex-row 768:items-center 768:justify-between 768:gap-10">
            <div className="flex flex-col gap-5 768:gap-10">
              <p className="text-xl font-normal 768:text-2xl 1280:text-3xl">
                Fill out the opt-in form with exact location, time and optional
                phone number.
              </p>
              <img
                src="/assets/images/services/services-features-3.png"
                className="max-h-[8.125rem] max-w-[7.5rem] 768:hidden"
                alt="secure-img"
              />
              <p className="text-xl font-normal 768:text-2xl 1280:text-3xl">
                Artists will receive the form you fill out as a notification,
                letting them know you've selected them!
              </p>
            </div>
            <img
              src="/assets/images/services/services-features-3.png"
              className="hidden max-h-[14.56rem] max-w-[14.5] 768:flex"
              alt="check-form"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 768:flex-row-reverse 768:items-center 768:justify-between">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold 768:text-3xl 1280:text-5xl">
              Secure Payment:
            </h1>
            <p className="text-xl font-normal 768:text-2xl 1280:text-3xl">
              Make secure payments through our platform, knowing your
              transaction is secure.
            </p>
          </div>
          <img
            src="/assets/images/services/services-features-4.png"
            alt="secure-img"
            className="max-h-[15.125rem] max-w-[15.375rem]"
          />
        </div>
      </div>
    </div>
  );
};
