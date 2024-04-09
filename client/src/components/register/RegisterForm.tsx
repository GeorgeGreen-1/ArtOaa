import { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useWindowSize from "src/hooks/useWindowSize";
import { useSignupMutation } from "src/redux/auth/authApiSlice";

import { Button } from "src/components/ui";
import {
  IconCross,
  IconHidePassword,
  IconShowPassword,
} from "src/components/icons";

import { RegisterSchema, IRegisterSchema } from "./RegisterSchema";
import { ArtStyleOptions } from "src/components/shared";

type Props = {
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterForm: React.FC<Props> = ({ setIsSuccess }) => {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRegisterSchema>({ mode: "onSubmit" });

  const RoleOptions = [
    { value: "artist", label: "Artist" },
    { value: "customer", label: "Customer" },
  ];

  const onNavigateToLogin = () => navigate("/auth/login");
  const onNavigateToHome = () => navigate("/");

  const onSubmit: SubmitHandler<IRegisterSchema> = async (data) => {
    await signup({
      ...data,
      role: data.role.value,
      artStyle: data.artStyle
        ? data.artStyle.map((style) => {
            return {
              name: style.label,
            };
          })
        : [],
    })
      .unwrap()
      .then(async () => setIsSuccess(true))
      .catch((error) => {
        if (error.originalStatus === 400) {
          setErrorMessage(error.data);
        } else {
          setErrorMessage("Something went wrong");
        }
      });

    reset();
  };

  const role = watch("role");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full rounded-[1.875rem] bg-white px-4 py-10 shadow-[-6px_4px_0_0_rgba(248,58,5,1)] 768:w-[70%] 768:p-10 1024:w-[60%] 1440:px-20"
    >
      <div className="relative mb-5 flex items-center justify-center 1024:justify-start">
        {width < 768 && (
          <div
            onClick={onNavigateToHome}
            className="absolute left-2 cursor-pointer"
          >
            <IconCross size="20" />
          </div>
        )}
        <h2 className="text-2xl text-[#333333] 1024:text-3xl">Sign up now</h2>
      </div>

      <div className="mb-8 flex flex-col gap-3 1024:gap-5">
        <div className="grid gap-y-3 1024:gap-y-5 1440:grid-cols-2 1440:gap-x-4">
          <div className="h-14">
            <input
              className={`h-full w-full rounded-xl border ${errors.firstName ? "border-[#F83A05]" : "border-[#66666659/35]"} px-5 focus:outline-none`}
              placeholder="First Name"
              {...register("firstName", RegisterSchema.firstName)}
            />
          </div>

          <div className="h-14">
            <input
              className={`h-full w-full rounded-xl border ${errors.lastName ? "border-[#F83A05]" : "border-[#66666659/35]"} px-5 focus:outline-none`}
              placeholder="Last Name"
              {...register("lastName", RegisterSchema.lastName)}
            />
          </div>
        </div>

        <div className="h-14">
          <input
            className={`h-full w-full rounded-xl border ${errors.email ? "border-[#F83A05]" : "border-[#66666659/35]"} px-5 focus:outline-none`}
            placeholder="Email Address"
            {...register(`email`, RegisterSchema.email)}
          />
        </div>

        <Controller
          control={control}
          name="role"
          rules={RegisterSchema.role}
          render={({ field }) => (
            <Select
              options={RoleOptions}
              {...field}
              placeholder="I am ..."
              styles={{
                control: (styles) => ({
                  ...styles,
                  borderRadius: "0.75rem",
                  border: `1px solid ${errors.role ? "#F83A05" : "rgba(102, 102, 102, 0.15)"}`,
                  outline: "none",
                  padding: "0 0.5rem",
                  width: "100%",
                  height: "3.5rem",
                  boxShadow: "none",
                  "&:hover": {
                    border: `1px solid ${errors.role ? "#F83A05" : "rgba(102, 102, 102, 0.15)"}`,
                  },
                }),
              }}
            />
          )}
        />

        {role && role.value === "artist" && (
          <>
            <div>
              <Controller
                control={control}
                name="artStyle"
                rules={RegisterSchema.artStyles}
                render={({ field }) => (
                  <Select
                    isMulti
                    options={ArtStyleOptions}
                    {...field}
                    placeholder="Select Styles..."
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        borderRadius: "0.75rem",
                        border: `1px solid ${errors.artStyle ? "#F83A05" : "rgba(102, 102, 102, 0.15)"}`,
                        outline: "none",
                        padding: "0 0.5rem",
                        width: "100%",
                        height: "3.5rem",
                        boxShadow: "none",
                        "&:hover": {
                          border: `1px solid ${errors.artStyle ? "#F83A05" : "rgba(102, 102, 102, 0.15)"}`,
                        },
                      }),
                    }}
                  />
                )}
              />
            </div>

            <div className="h-[8.5rem]">
              <textarea
                className={`h-full w-full resize-none rounded-xl border ${errors.aboutMe ? "border-[#F83A05]" : "border-[#66666659/35]"} px-5 py-3 outline-none`}
                {...register("aboutMe", RegisterSchema.aboutMe)}
                placeholder="About me..."
              />
            </div>
          </>
        )}

        <div className="relative h-14">
          <input
            className={`h-full w-full rounded-xl border ${errors.password ? "border-[#F83A05]" : "border-[#66666659/35]"} px-5 focus:outline-none`}
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 6)"
            {...register("password", RegisterSchema.password)}
          />
          <div
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            className="absolute right-3 top-1/2 h-8 w-8 translate-y-[-50%] cursor-pointer"
          >
            {showPassword ? <IconHidePassword /> : <IconShowPassword />}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-3 flex items-center rounded-xl border border-[#F83A05] p-3 px-5">
          <p className="text-[#F83A05]">{errorMessage}</p>
        </div>
      )}

      <div className="mb-5 1440:flex 1440:items-center 1440:justify-between">
        <Button
          variant="tertiary"
          className="mb-2 w-full 1440:mb-0 1440:w-auto"
        >
          Sign up
        </Button>

        <p className="text-center">
          Already have an ccount?{" "}
          <strong onClick={onNavigateToLogin} className="cursor-pointer">
            Log in
          </strong>
        </p>
      </div>

      {/* <p className="mb-5 text-lg">or continue with</p>

      <div className="flex gap-5">
        <div className="flex h-[3.25rem] w-[5.375rem] cursor-pointer items-center justify-center rounded-[10px] border border-black">
          <IconGoogle />
        </div>
        <div className="flex h-[3.25rem] w-[5.375rem] cursor-pointer items-center justify-center rounded-[10px] border border-black">
          <IconGoogle />
        </div>
        <div className="flex h-[3.25rem] w-[5.375rem] cursor-pointer items-center justify-center rounded-[10px] border border-black">
          <IconGoogle />
        </div>
      </div> */}
    </form>
  );
};
