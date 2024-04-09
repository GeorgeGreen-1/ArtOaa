import { IArtistConfig } from "src/config/ArtistsConfig";

type IArtistProps = {
  artist: IArtistConfig;
  proposal?: boolean;
  openMenu?: () => void;
};
export const ArtistCard: React.FC<IArtistProps> = ({ artist, proposal, openMenu }) => {
  return (
    <div
      onClick={openMenu}
      className={`flex ${proposal ? "h-full" : "h-[32rem]"} ${proposal ? "flex-row" : "flex-col"} rounded-[1.875rem] bg-white text-black shadow-[4px_4px_20px_0_rgba(0,0,0,0.25)] ${proposal ? "h-full" : "h-[35rem]"}`}
    >
      <img
        src={artist.src}
        className={`${proposal ? "h-full" : "h-[20rem]"} ${proposal ? "w-1/3" : "w-full"} rounded-[1.875rem] ${!proposal ? "rounded-bl-none" : "rounded-tr-none"} rounded-br-none`}
        alt={artist.name}
      />
      <div className={`${proposal ? "w-2/3" : ""}`}>
        <div className="flex flex-col gap-8 px-5 pb-10 pt-3">
          <div
            className={`flex h-[4.5rem] ${proposal ? "flex-col" : ""} w-full items-start `}
          >
            <h2 className=" text-[1.25rem] 1280:text-4xl">{artist.name}</h2>
            <p className=" text-[0.75rem] 1280:text-base">
              {artist.description}
            </p>
          </div>
          <div
            className={`flex h-[4.5rem] w-full flex-row gap-10 `}
          >
            <h2 className=" text-[0.75rem] 1280:text-base">{artist.name}</h2>
            <p className=" flex-end text-[0.75rem] 1280:text-base">
              {artist.description}
            </p>
          </div>
          <div className="flex w-fit flex-wrap gap-[0.625rem]  1280:gap-x-[0.625rem] 1280:gap-y-5">
            {artist.genre.map((genre) => {
              return (
                <div
                  key={genre.id}
                  className="flex h-[1.5rem] items-center justify-center rounded-[0.625rem] bg-[#1A1A1A] px-[12px] 768:h-8 768:w-[8rem] 768:px-0 1280:h-10"
                >
                  <p className="text-[0.75rem] font-semibold text-white 1280:text-base">
                    {genre.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
