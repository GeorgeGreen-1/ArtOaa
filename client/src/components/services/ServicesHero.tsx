import { ServicesHeroConfig } from "src/config/ServicesConfigs";

export const ServicesHero = () => {
  return (
    <div className="flex h-full w-full flex-col gap-20 bg-[#E5E5E5] px-10 py-10 768:px-20 1440:px-32">
      {ServicesHeroConfig.map((service) => {
        return (
          <div
            key={service.id}
            className={`flex h-full w-full flex-col justify-center ${service.id === 1 ? "items-center 768:flex-row 768:justify-between" : "768:flex-row-reverse"} gap-6 768:gap-10`}
          >
            <img
              src={service.src}
              className={`${service.id === 1 ? "max-h-[25rem] 768:max-w-[27rem]" : "max-h-[25.81rem] px-5 540:px-14 768:w-1/2 768:px-10 1536:px-14 1592:px-16"} min-w-[12rem] 768:w-1/2`}
              alt={service.title}
            />
            <div
              className={`flex flex-col gap-5 ${service.id === 1 ? "px-5 py-20 768:w-[50%] 768:self-start" : "768:w-1/2 768:self-center"}`}
            >
              <h1
                className={`text-4xl ${service.id === 0 ? "max-w-[18.75rem]" : ""} font-bold`}
              >
                {service.title}
              </h1>
              <p
                className={`text-base ${service.id === 0 ? "max-w-[18.75rem] text-[#000]" : "bg-[#FCA311] px-5 py-10 text-[#FFF]"} font-semibold `}
              >
                {service.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
