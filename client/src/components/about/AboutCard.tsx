import { IconStar } from "src/components/icons";
import { IContentConfig } from "src/config/ContentConfig";
import useWindowSize from "src/hooks/useWindowSize";

type AboutCardProps = {
  content: IContentConfig;
};

export const AboutCard: React.FC<AboutCardProps> = ({ content }) => {
  const { width } = useWindowSize();
  return (
    <div
      className={`relative z-10 flex w-full flex-col rounded-[1.875rem] bg-[#E5E5E5] pb-[0.625rem]  ${content.id === 1 ? "1024:flex-row" : "1024:flex-row-reverse"} gap-5 1024:h-[40rem] 1024:gap-5 1024:pb-0`}
    >
      {width >= 1280 && (
        <IconStar
          color="#FCA311"
          width="w-[2.8125rem]"
          height="h-[2.8125rem]"
          right={content.id === 1 ? "right-10" : ""}
          bottom={content.id === 1 ? "bottom-[7.125rem]" : ""}
          top={content.id === 1 ? "" : "top-[2rem]"}
          left={content.id === 1 ? "" : "left-10"}
        />
      )}
      <img
        src={content.src}
        alt={content.title}
        className="h-[14rem] w-full rounded-[1.875rem] 540:h-[17rem] 640:h-[18rem] 768:h-[20rem] 1024:h-full 1024:w-1/2"
      />
      <div className="flex w-full flex-col gap-2 px-5 pb-10 1024:w-1/2 1024:px-10 1024:py-[5rem]">
        <h1 className="text-[1.875rem] font-bold text-[#FCA311] 1024:text-[3.75rem] 1440:text-[4rem]">
          {content.title}
        </h1>
        <p className="max-w-[50rem] text-sm 1024:text-lg 1440:text-2xl">
          {content.description}
        </p>
      </div>
    </div>
  );
};
