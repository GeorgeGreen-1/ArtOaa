import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "src/components/ui";
import { PaymentInfoFormSchema, PaymentInfoFormSchemaType } from "./Schemas";

export const PaymentInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentInfoFormSchemaType>({
    resolver: zodResolver(PaymentInfoFormSchema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCVC: "",
    },
  });

  const onSubmit: SubmitHandler<PaymentInfoFormSchemaType> = (data) => {
    console.log(data);
  };

  const convertCardNumber = (
    cardNumber: string,
    space: number = 4,
  ): string | false => {
    if (!cardNumber) {
      return false;
    }

    const cleanedNumber: string = cardNumber.replace(/[^\dA-Z]/g, "");
    const regexPattern: RegExp = new RegExp(`.{1,${space}}`, "g");

    return cleanedNumber.replace(regexPattern, (group: string) => group + " ");
  };

  return (
    <div className="h-full w-full  768:w-[38rem] 834:w-[40rem] 1024:w-[45rem] 1280:w-[50rem] 1440:w-[60rem] 1536:w-[62rem] 1592:w-[65rem]">
      <div className="flex w-full flex-col gap-5 768:flex-row 768:justify-between">
        <div className="flex h-[14.5rem]  w-full flex-col  gap-10 self-center rounded-xl bg-gradient-to-br from-[#F83A05] via-[#FCA311] to-[#f83a0542] px-5 py-5 1024:w-[50%]">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-[50%] bg-white"></div>
            <div className="h-6 w-6 rounded-[50%] border"></div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="h-5 text-white">
              {convertCardNumber(watch("cardNumber"), 4)}
            </p>
            <div className="flex justify-between pb-8">
              <p className="h-5 text-white">{watch("cardHolder")}</p>
              <p className="h-5 text-white">
                {watch("cardMonth")}/{watch("cardYear")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex h-[14.5rem] w-full flex-col self-center  rounded-xl bg-[#d2d3d9] py-8  768:mt-0 1024:w-[50%]">
          <div className="h-[1.8rem] w-full bg-black"></div>
          <div className="m-8 flex justify-end bg-[#ADB5BE] p-1">
            <p className="h-5">{watch("cardCVC")}</p>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full flex-col gap-14"
      >
        <div className="mt-10 flex w-full flex-col gap-5 1024:flex-row">
          <div className="flex w-full flex-col gap-[0.625rem] 768:flex-row 768:gap-5 1024:flex-col">
            <div className="flex w-full flex-col ">
              <label className="self-start">CARDHOLDER NAME</label>
              <input
                className={`rounded-xl border ${errors.cardHolder ? "border-[#F83A05]" : "border-[#66666659]"} px-5 py-3 outline-none`}
                type="text"
                {...register("cardHolder")}
                maxLength={28}
                placeholder="John Doe"
              />
            </div>

            <div className="flex w-full flex-col ">
              <label className="self-start">CARD NUMBER</label>
              <input
                className={`rounded-xl border ${errors.cardNumber ? "border-[#F83A05]" : "border-[#66666659]"} px-5 py-3 outline-none`}
                type="text"
                maxLength={16}
                {...register("cardNumber")}
                placeholder="1111 1111 1111 1111"
              />
            </div>
          </div>

          <div className="flex w-full flex-col">
            <label className="self-start">EXP.DATE MM/YY CVC</label>
            <div className="flex w-full gap-[0.625rem] 768:gap-5  1024:flex-col 1024:gap-[2rem]">
              <div className=" flex w-1/2 gap-5 1024:w-full">
                <input
                  className={`w-full rounded-xl border 1024:w-1/2 ${errors.cardMonth ? "border-[#F83A05]" : "border-[#66666659]"} px-5 py-3 outline-none`}
                  type="text"
                  maxLength={2}
                  placeholder="MM - 01"
                  {...register("cardMonth")}
                />
                <input
                  className={`w-full rounded-xl border 1024:w-1/2 ${errors.cardYear ? "border-[#F83A05]" : "border-[#66666659]"} px-5 py-3 outline-none`}
                  type="text"
                  placeholder="YY - 01"
                  maxLength={2}
                  {...register("cardYear")}
                />
              </div>
              <div className="w-1/2 1024:mt-[0.625rem] 1024:w-full">
                <input
                  placeholder="CVC"
                  className={`w-full rounded-xl border ${errors.cardCVC ? "border-[#F83A05]" : "border-[#66666659]"} px-5 py-3 outline-none`}
                  type="text"
                  maxLength={3}
                  {...register("cardCVC")}
                />
              </div>
            </div>
          </div>
        </div>
        <Button className="self-center">Save Changes</Button>
      </form>
    </div>
  );
};
