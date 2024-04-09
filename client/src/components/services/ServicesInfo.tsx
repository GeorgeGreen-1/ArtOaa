import { ServicesInfoConfig } from "src/config/ServicesConfigs";

export const ServicesInfo = () => {
  return (
    <div className="flex h-full w-full flex-col gap-5 bg-[#121212] px-2 py-20 768:px-20 1440:px-32">
      <div className="grid grid-cols-1 gap-5 1024:grid-cols-3">
        {ServicesInfoConfig.map((service) => {
          return (
            <div
              key={service.id}
              className="flex flex-col gap-5 rounded-2xl border-b-4 border-l-4 border-[#F83A05] bg-[#EFEFEF] px-3 py-8"
            >
              <h1 className="text-2xl font-bold">{service.title}</h1>
              <p className="text-2xl">{service.description}</p>
            </div>
          );
        })}
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between rounded-2xl border-b-4 border-l-4 border-[#F83A05] bg-[#EFEFEF] px-3 py-8 1024:flex-row-reverse">
        <img
          className="max-h-[20rem]"
          alt="services-info-img"
          src="/assets/images/services/services-info.png"
        />
        <h1 className="text-2xl font-bold">
          Our integrated payment system provides you with hassle-free and secure
          transactions.
        </h1>
      </div>
    </div>
  );
};
