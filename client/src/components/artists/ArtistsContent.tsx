import { ArtistsConfig } from "src/config";
import {
  Card,
  ArtistDecription,
  ArtistImage,
  ArtistInfoWrapper,
  ArtistName,
  ArtistTextWrapper,
  GenreCard,
  GenreParagpraph,
  GenreWrapper,
} from "src/components/ui/ArtistCard";
import { StarRating } from "../shared";
import useProgressiveImage from "src/hooks/useProgressiveImage";

export const ArtistsContent = () => {
  const sourceLoaded = useProgressiveImage(
    "/assets/images/artists/artist-bg.png",
  );

  return (
    <div
      className="h-full w-full px-10 py-[3.75rem] text-white 1280:px-20"
      style={{
        backgroundImage: `url(${sourceLoaded})`,
        backgroundSize: "cover",
        backgroundColor: sourceLoaded ? "" : "#121212", // Set background color to #FAA32F if image is not loaded
      }}
    >
      <h1 className="mb-10 border-b-0 border-l-4 border-r-0 border-t-0 border-[#F83A05] border-[30] px-2 text-[1.625rem] font-bold 1280:mb-20 1280:w-[10rem] 1280:border-b-4 1280:border-l-0 1280:px-0 1280:text-[2.5rem]">
        Artists
      </h1>
      <div className="grid grid-cols-1 gap-5 768:grid-cols-2 1536:grid-cols-3">
        {ArtistsConfig.map((artist) => {
          return (
            <Card
              className="h-[32rem] flex-col bg-[#E5E5E5] 768:h-[40rem]"
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
                  <ArtistDecription className="line-clamp-3">
                    {artist.description}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officia enim ea deleniti excepturi aspernatur, tempora
                    delectus sunt ex? Impedit tempora error asperiores
                    laudantium illo cum sequi, odit nihil sapiente molestias.
                  </ArtistDecription>
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
          );
        })}
      </div>
    </div>
  );
};
