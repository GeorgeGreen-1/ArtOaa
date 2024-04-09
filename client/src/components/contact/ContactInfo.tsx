import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconLocation,
  IconMail,
  IconPhone,
  IconStar,
} from "src/components/icons";

export const ContactInfo = () => {
  return (
    <div className="max-full relative mt-[0.625rem] flex w-full flex-col justify-between gap-[3.75rem] rounded-[1.875rem] bg-[#121212] px-5 py-[1.875rem] text-center text-white 768:mb-[0.625rem] 768:w-[50%] 1024:w-[40%] 1280:px-10 1280:py-[6.25rem]">
      <div className="flex flex-col items-center justify-center 768:items-start">
        <h1 className="text-xl 768:self-start 768:text-2xl 1280:text-4xl">
          Contact Information
        </h1>
        <p className="text-[0.875rem] text-[#C9C9C9] 768:self-start 768:text-base 1280:text-2xl">
          Say something to start a live chat!
        </p>
      </div>
      <div className="flex flex-col gap-5 768:gap-[3.125rem] ">
        <div className="flex flex-row gap-4">
          <IconPhone />
          <p>+995 999 999</p>
        </div>
        <div className="flex flex-row gap-4">
          <IconMail color="#FFFFFF" />
          <p>example@gmail.com</p>
        </div>
        <div className="flex flex-row gap-4 ">
          <IconLocation color="#FFF" />
          <p>Tbilisi</p>
        </div>
      </div>
      <div className="flex gap-5">
        <IconFacebook />
        <IconInstagram />
        <IconLinkedin />
      </div>
      <IconStar
        width="w-[55px]"
        height="h-[55px]"
        color="#F83A05"
        top="top-[70.76%]"
        right="right-[3.55%]"
        bottom="bottom-[41.64%]"
        left="left-[70%]"
      />
      <IconStar
        width="w-[35px]"
        height="h-[35px]"
        color="#FCA311"
        top="top-[80.76%]"
        right="right-[10.55%]"
        bottom="bottom-[10.64%]"
        left="left-[80%]"
        rotated={true}
      />
    </div>
  );
};
