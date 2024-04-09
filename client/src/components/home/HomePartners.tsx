import Slider from "react-slick";
import { PartnersConfig } from "src/config/PartnersConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomePartners = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
    cssEase: "linear",
    disableInteraction: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Slider
        {...settings}
        className="flex h-full w-full items-center justify-center pb-[0.625rem] pt-5"
      >
        {PartnersConfig.map((partner) => (
          <div
            className="flex h-full w-full items-center justify-center"
            key={partner.id}
          >
            <img
              src={partner.src}
              alt={partner.title}
              className="h-36 w-32 object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
