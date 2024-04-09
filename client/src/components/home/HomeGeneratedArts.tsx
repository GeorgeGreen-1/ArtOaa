import { GeneratedWorksConfig } from "src/config/GeneratedWorksConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const HomeGeneratedArts = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
    cssEase: "linear",
    disableInteraction: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="flex h-full w-full flex-col gap-10 bg-[#121212] pb-[9.5rem] pt-[7rem] 1280:gap-16">
      <h1 className="ml-5 border-4 border-b-0 border-r-0 border-t-0 border-l-[#F83A05] px-2 text-2xl font-semibold text-white 1280:ml-20 1280:text-5xl">
        ArtOa Generated Arts
      </h1>
      <Slider
        {...settings}
        className="flex items-center justify-center h-full w-full gap-2 pb-[0.625rem] pt-5"
      >
        {GeneratedWorksConfig.map((work) => (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-5"
            key={work.id}
          >
            <img
              src={work.src}
              alt={work.title}
              className="w-[15rem] rounded-lg 1536:w-[20.75rem]"
            />
            <h1
              className={`mt-5 text-[0.875rem] font-semibold text-[#FCA311] 1280:text-xl`}
            >
              {work.title}
            </h1>
          </div>
        ))}
      </Slider>
    </div>
  );
};
