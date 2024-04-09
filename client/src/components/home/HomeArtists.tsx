import React from "react";
import Slider from "react-slick";
import { StarRating } from "src/components/shared";
import { ArtistsConfig } from "src/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconCarouselNext, IconCarouselPrev } from "src/components/icons";
import {
  ArtistDecription,
  ArtistImage,
  ArtistInfoWrapper,
  ArtistName,
  ArtistTextWrapper,
  Card,
  GenreCard,
  GenreParagpraph,
  GenreWrapper,
} from "src/components/ui/ArtistCard";

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className={`absolute left-[-1.5rem] top-[40%] flex cursor-pointer   items-center justify-center  1280:left-[-2.5rem] `}
    onClick={onClick}
  >
    <IconCarouselNext />
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className={`absolute right-[-1.5rem] top-[40%] cursor-pointer  items-center justify-center 1280:right-[-2.5rem] `}
    onClick={onClick}
  >
    <IconCarouselPrev />
  </div>
);

export const HomeArtists: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    disableInteraction: false,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#E5E5E5] px-7 py-[7.5rem] 1280:px-20">
      <Slider {...settings} className="">
        {ArtistsConfig.map((artist, index) => (
          <div key={index} className="px-5 py-5">
            <Card
              className="h-[36rem] flex-col bg-[#E5E5E5] 1440:h-[45rem]"
              key={artist.id}
            >
              <ArtistImage
                className="h-[55%] w-full"
                src={artist.src}
                alt={artist.name}
              />
              <ArtistInfoWrapper className="h-[45%]">
                <ArtistTextWrapper>
                  <ArtistName>{artist.name}</ArtistName>
                  <ArtistDecription>{artist.description}</ArtistDecription>
                </ArtistTextWrapper>
                <StarRating />
                <GenreWrapper>
                  {artist.genre.map((genre) => {
                    return (
                      <GenreCard key={genre.id}>
                        <GenreParagpraph>{genre.name}</GenreParagpraph>
                      </GenreCard>
                    );
                  })}
                </GenreWrapper>
              </ArtistInfoWrapper>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};
