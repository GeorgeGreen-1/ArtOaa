import { Button } from "src/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, ContactFormSchemaType } from "./ContactFormSchema";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      mail: "",
      phonenumber: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormSchemaType> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex w-full  flex-col gap-[0.625rem] text-[#666666]  768:w-[50%] 1024:w-[60%] 768:self-center 1280:gap-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5 1280:gap-10"
      >
        <div className="flex w-full flex-col gap-[0.625rem] 1280:flex-row 1280:gap-5">
          <div className="flex w-full flex-col">
            <label>First name</label>
            <input
              {...register("firstname")}
              className={`rounded-xl ${errors.firstname ? "border-red-500" : "border-[#66666659]"} border px-5 py-3 outline-none`}
              type="text"
            />
          </div>
          <div className="flex w-full flex-col">
            <label>Last name</label>
            <input
              {...register("lastname")}
              className={`rounded-xl ${errors.lastname ? "border-red-500" : "border-[#66666659]"} border px-5 py-3 outline-none`}
              type="text"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-[0.625rem] 1280:flex-row 1280:gap-5">
          <div className="flex w-full flex-col">
            <label>Mail</label>
            <input
              {...register("mail")}
              className={`rounded-xl ${errors.mail ? "border-red-500" : "border-[#66666659]"} border px-5 py-3 outline-none`}
              type="text"
            />
          </div>
          <div className="flex w-full flex-col">
            <label>Phone number</label>
            <input
              {...register("phonenumber")}
              className={`rounded-xl ${errors.phonenumber ? "border-red-500" : "border-[#66666659]"} border px-5 py-3 outline-none`}
              type="text"
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <label>Message</label>
          <textarea
            {...register("message")}
            placeholder="Write your message"
            className={`h-[8.5rem] resize-none rounded-xl border ${errors.message ? "border-red-500" : "border-[#66666659]"}  px-5 py-3 outline-none`}
          ></textarea>
        </div>
        <Button
          className="mb-5 1280:mt-10 1280:w-1/3 1280:self-end"
          variant="primary"
          type="submit"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};
