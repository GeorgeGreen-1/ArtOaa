import { ContentConfig } from "src/config/ContentConfig";
import { AboutCard } from "./AboutCard";
import { TeamMembersConfig } from "src/config";

export const AboutContent = () => {
  return (
    <div className="relative flex h-full w-full flex-col gap-10 overflow-hidden bg-black px-10 py-[6.875rem] 1280:gap-[7.5rem] 1280:px-[8.75rem]">
      {ContentConfig.map((content) => {
        return <AboutCard key={content.id} content={content} />;
      })}
      <div className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-10 rounded-[1.875rem] bg-[#E5E5E5] px-10 py-20 834:flex-row 834:justify-around">
        {TeamMembersConfig.map((member) => {
          return (
            <div
              key={member.id}
              className="flex max-w-[19.38rem] flex-col items-center justify-center gap-5 text-center 1280:max-w-[25rem]"
            >
              <h1 className="order-2 text-[1.75rem] font-semibold 1024:order-1">
                {member.name}
              </h1>
              <img
                className="order-1 h-[10.75rem] rounded-full 540:h-[15rem] 640:h-[16rem] 768:h-[17rem] 834:order-2 1024:h-[20rem]"
                src={member.src}
                alt={member.name}
              />
              <p className="order-3 text-base font-semibold 834:text-2xl">
                {member.description}
              </p>
            </div>
          );
        })}
      </div>
      {/*FIRST BOX - top first two shapes one box and one with 2 border */}
      <div className="absolute right-[13px] top-[20rem] h-[8.9375rem] w-[14.5625rem] rounded-[1.875rem] border-4 border-[#F83A05] bg-black bg-transparent 1280:right-[100px] 1280:top-[14.5rem] 1280:h-[35rem] 1280:w-[calc(50%-108px)]"></div>
      <div className="absolute right-[-200px] top-[28.8rem] h-[2rem] w-[15rem] rounded-[1.875rem] rounded-tl-none border-4 border-t-0 border-[#F83A05] 1280:right-[-250px] 1280:top-[49.3rem] 1280:h-[3rem] 1280:w-[30rem]"></div>
      {/* SECOND BOX - middle two shapes one box and one hr line */}
      <div className="absolute left-[13px] top-[42rem] h-[14rem] w-[14.5625rem] rounded-[1.875rem] border-4 border-[#F83A05] bg-transparent 1280:left-[100px] 1280:top-[62rem] 1280:h-[35rem] 1280:w-[calc(50%-108px)]"></div>
      <hr className="absolute left-[-13px] top-[45rem] w-[1.7rem] border-2 border-[#F83A05] 1280:left-[-2rem] 1280:top-[70rem] 1280:w-[8.3rem]" />
      {/*THIRD BOX - bottom two shapes one box and one desktop shape with 2 border */}
      {/*FOURTH BOX bottom last box*/}
    </div>
  );
};
