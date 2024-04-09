import { ArtistsWorkConfig } from "src/config/ArtistsWorkConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const HomeArtistsWorks = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
    cssEase: "linear",
    disableInteraction: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 14400,
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
        Featured Artists
      </h1>
      <Slider
        {...settings}
        className="flex h-full w-full gap-2 pb-[0.625rem] pt-5"
      >
        {ArtistsWorkConfig.map((work) => (
          <div
            className="flex h-full w-full  items-center justify-center"
            key={work.id}
          >
            <img
              src={work.src}
              alt={work.title}
              className="h-[15.1875rem] w-[15rem] rounded-lg  1536:h-[32rem] 1536:w-[25.75rem]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
