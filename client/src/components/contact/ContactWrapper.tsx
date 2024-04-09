import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export const ContactWrapper = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden  bg-[#121212] px-10 py-[3.75rem] 768:h-[51.25rem]">
      <div className="1240:pr-[8.75rem] relative z-20 flex w-full flex-col gap-10 rounded-[1.875rem] border-b-2 border-l-2 border-[#F83A05] bg-white px-[0.625rem] 768:flex-row 768:pr-10  1440:gap-[10.5rem]">
        <ContactInfo />
        <ContactForm />
      </div>
      <div className="absolute right-[13px] top-[20rem] z-10 h-[8.9375rem] w-[14.5625rem] rounded-[1.875rem] border-4 border-[#F83A05] bg-black bg-transparent 1280:top-[10rem] 1280:h-[20rem]"></div>
      <div className="absolute right-[-200px] top-[28.8rem] z-10 h-[2rem] w-[15rem] rounded-[1.875rem] rounded-tl-none border-4 border-t-0 border-[#F83A05] 1280:hidden"></div>
      <div className="absolute left-[13px] top-[42rem] h-[14rem] w-[14.5625rem] rounded-[1.875rem] border-4 border-[#F83A05] bg-transparent 1280:left-[100px] 1280:top-[62rem] 1280:h-[35rem] 1280:w-[calc(50%-108px)]"></div>
      <hr className="absolute left-[-13px] top-[45rem] w-[1.7rem] border-2 border-[#F83A05] 1280:left-[-2rem] 1280:top-[70rem] 1280:w-[8.3rem]" />
      <div className="absolute bottom-[-3rem] right-[-20px] h-[14rem] w-[14.5625rem] rounded-[1.875rem]  border-4 border-[#F83A05] bg-transparent 1280:bottom-[-4rem] 1280:w-[20rem]"></div>
    </div>
  );
};
