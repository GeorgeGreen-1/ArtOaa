import { Button } from "src/components/ui";

export const HomeInfo = () => {
  return (
    <div className="1280:px-[8.75rem] 1280:py-[8.75rem] flex h-full w-full flex-col items-center justify-center gap-20 bg-black px-10 py-20 text-white">
      <div className="834:h-[20rem] 1280:h-[29rem] 834:flex-row 834:gap-5 flex w-full flex-col gap-10">
        <div className="834:w-[40%] 834:justify-between flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="1280:text-[2.875rem] text-[1.625rem] font-bold text-[#FCA311]">
              Wall artists in any direction
            </h1>
            <hr className="rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
            <div className="flex flex-col">
              <p className="1280:text-2xl text-sm font-semibold">
                Here you will meet wall artists in any direction:{" "}
              </p>
              <ul className="1280:text-2xl text-sm font-semibold">
                <li>graffiti,</li>
                <li>mural,</li>
                <li>3D Art,</li>
                <li>stencil,</li>
                <li>etc.</li>
              </ul>
            </div>
          </div>
          <Button className="834:flex mb-1 hidden self-start" variant="primary">
            See More
          </Button>
        </div>
        <img
          className="834:h-full 834:w-[60%] h-[10rem] rounded-[1.875rem] object-cover"
          src="/assets/images/home/home-info-1.png"
          alt="test"
        />
        <Button className="834:hidden w-full" variant="primary">
          See More
        </Button>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="834:h-[20rem] 1280:h-[28rem] 834:flex-row-reverse 834:gap-5 flex w-full flex-col gap-10">
          <div className="834:w-[40%] 834:justify-between flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="1280:text-[2.875rem] text-[1.625rem] font-bold text-[#FCA311]">
                Artist Portfolios
              </h1>
              <hr className="rounded-br-lg rounded-tr-lg border-4 border-solid border-[#F83A05]" />
              <p className="1280:text-2xl text-sm font-semibold">
                On our platform, you can visit artists portfolios and rate them
                based on their experience
              </p>
            </div>
            <Button
              className="834:flex mb-1 hidden self-start"
              variant="primary"
            >
              See More
            </Button>
          </div>
          <img
            className="834:h-full 834:w-[60%] h-[10rem] rounded-[1.875rem] object-cover"
            src="/assets/images/home/home-info-2.png"
            alt="test2"
          />
          <Button className="834:hidden" variant="primary">
            See More
          </Button>
        </div>
      </div>
    </div>
  );
};
