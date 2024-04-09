import useWindowSize from "src/hooks/useWindowSize";
import { LangSwitcher } from "src/components/shared";
import {
  IconArrowRight,
  IconCopyright,
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconQuestionMark,
} from "src/components/icons";

export const Footer = () => {
  const { width } = useWindowSize();

  return (
    <div className="bg-black px-10 pb-12 pt-3 1024:px-20 1592:pb-20 1592:pt-10">
      <div className="mb-6 flex items-center justify-between 1592:mb-2">
        <div className="h-[4rem] w-[4.8rem]">
          <img
            src="/assets/images/shared/artoa-logo.png"
            alt="artoa logo"
            className="h-full w-full"
          />
        </div>
        <LangSwitcher />
      </div>

      <div className="1592:flex 1592:justify-between ">
        <div className="834:flex 834:items-center 834:justify-between 1592:items-end 1592:gap-10">
          <div className="mb-6 flex flex-col gap-3 1592:mb-0">
            <div className="flex items-center gap-2">
              <IconQuestionMark />
              <h3 className="text-sm font-bold text-white">Help & Support</h3>
            </div>
            <div className="flex items-center gap-2">
              <IconCopyright />
              <h3 className="text-sm font-bold text-white">
                Copyright 2024 ArtOa.io
              </h3>
            </div>
          </div>

          <ul className="mb-6 flex gap-10 text-sm font-semibold text-white 640:gap-16 834:gap-20 1592:mb-0 1592:gap-10">
            {width <= 640 ? (
              <>
                <div>
                  <li className="cursor-pointer">Projects</li>
                  <li className="cursor-pointer">Portfolios</li>
                  <li className="cursor-pointer">Our Team</li>
                </div>
                <div>
                  <li className="cursor-pointer">AI/AR Order Generators</li>
                  <li className="cursor-pointer">About</li>
                  <li className="cursor-pointer">Contact</li>
                </div>
              </>
            ) : (
              <>
                <div>
                  <li className="mb-3 cursor-pointer">Projects</li>
                  <li className="cursor-pointer">Portfolios</li>
                </div>
                <div>
                  <li className="mb-3 cursor-pointer">Our Team</li>
                  <li className="cursor-pointer">AI/AR Order Generators</li>
                </div>
                <div>
                  <li className="mb-3 cursor-pointer">About</li>
                  <li className="cursor-pointer">Contact</li>
                </div>
              </>
            )}
          </ul>
        </div>

        <div className="834:flex 834:justify-between 1592:gap-10">
          <div className="mb-5 834:mb-0">
            <p className="mb-4 text-xs font-semibold text-white">
              Be the first to hear about new arrivals, promotions, style
              inspiration and exclusive sneak peeks.
            </p>
            <div className="relative h-12">
              <input
                className="h-full w-full overflow-hidden rounded-[10px] border-2 border-[#FCA311] bg-transparent pl-5 pr-16 text-white placeholder:text-white focus:outline-none"
                placeholder="Enter email addres"
              />
              <div className="absolute right-0 inline-flex h-full w-12 cursor-pointer items-center justify-center rounded-[10px] bg-[#FCA311]">
                <IconArrowRight />
              </div>
            </div>
          </div>

          <div className="flex justify-between 834:flex-col 834:justify-end 834:gap-3">
            <h3 className="text-base font-bold text-[#FCA311]">Follow Us</h3>
            <div className="flex gap-5">
              <IconFacebook />
              <IconInstagram />
              <IconLinkedin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
