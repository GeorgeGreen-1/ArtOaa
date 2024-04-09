import { TeamMembersConfig } from "src/config";

export const HomeTeamMembers = () => {
  return (
    <div className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-10 bg-[#E5E5E5] px-10 py-20 834:flex-row 834:justify-around">
      {TeamMembersConfig.map((member) => {
        return (
          <div
            key={member.id}
            className="flex w-[19.38rem] flex-col items-center justify-center gap-5 text-center 1280:w-[25rem]"
          >
            <h1 className="xl:order-1 order-2 text-[1.75rem] font-semibold">
              {member.name}
            </h1>
            <img
              className="order-1 h-[18.75rem] w-full rounded-full 834:order-2 1280:h-[25rem]"
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
  );
};
