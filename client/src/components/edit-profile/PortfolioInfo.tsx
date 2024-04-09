import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { ArtStyleOptions, LocationOptions } from "src/components/shared";
import {
  PortfolioInfoFormSchema,
  PortfolioInfoFormSchemaType,
} from "./Schemas";
import { Button } from "src/components/ui";
import { IconLock } from "src/components/icons";
import { selectCurrentUser } from "src/redux/auth/authSlice";
import { useSelector } from "react-redux";

export const PortfolioInfo = () => {
  const loggedUser = useSelector(selectCurrentUser);

  const { register, control, handleSubmit } =
    useForm<PortfolioInfoFormSchemaType>({
      resolver: zodResolver(PortfolioInfoFormSchema),
      defaultValues: {
        // artStyles: [
        //   {
        //     value: "mosaic",
        //     label: "Mosaic",
        //   },
        // ],
        artStyles: loggedUser?.artStyle?.map((style) => {
          return { value: style.name.toLowerCase(), label: style.name };
        }),
        location: {
          value: "",
          label: "",
        },
        aboutMe: loggedUser?.aboutMe || "",
      },
    });

  const onSubmit: SubmitHandler<PortfolioInfoFormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className="h-full w-full 768:w-[38rem] 834:w-[40rem] 1024:w-[45rem] 1280:w-[50rem] 1440:w-[60rem] 1536:w-[62rem] 1592:w-[65rem]">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="flex w-full flex-col ">
            <label className="self-start">Art Style</label>
            <Controller
              control={control}
              name="artStyles"
              render={({ field }) => (
                <Select
                  isMulti
                  options={ArtStyleOptions}
                  {...field}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      borderRadius: "0.75rem",
                      border: "1px solid #66666659",
                      outline: "none",
                      padding: "0.35rem 0.5rem",
                      width: "100%",
                      boxShadow: "none",
                      // "&:hover": {
                      //   border: `1px solid ${errors.wallImageSize ? "#F83A05" : "#66666659"}`,
                      // },
                    }),
                  }}
                />
              )}
            />
          </div>
          <div className="flex w-full flex-col ">
            <label className="self-start">About me</label>
            <textarea
              className="h-[8.5rem] resize-none rounded-xl border border-[#66666659] px-5 py-3 outline-none"
              {...register("aboutMe")}
            />
          </div>
          <div className="flex w-full flex-col ">
            <label className="self-start">Location</label>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <Select
                  options={LocationOptions}
                  {...field}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      borderRadius: "0.75rem",
                      border: "1px solid #66666659",
                      outline: "none",
                      padding: "0.35rem 0.5rem",
                      width: "100%",
                      boxShadow: "none",
                      // "&:hover": {
                      //   border: `1px solid ${errors.wallImageSize ? "#F83A05" : "#66666659"}`,
                      // },
                    }),
                  }}
                />
              )}
            />
          </div>
          <div className="flex w-full flex-row items-center gap-2 bg-[#37474f1f] 768:gap-5">
            <div className="flex items-center justify-center bg-[#37474f94] px-6 py-5 768:px-8 ">
              <IconLock />
            </div>
            <p>
              We keep your data private and never share it with third-parties.
            </p>
          </div>
          <Button
            type="submit"
            className="mt-2 self-center 768:w-1/3"
            variant="primary"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
