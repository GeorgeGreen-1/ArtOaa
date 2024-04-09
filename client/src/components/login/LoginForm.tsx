import { useForm } from "react-hook-form";
import { ILoginSchema, LoginSchema } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApiSlice, useLoginMutation } from "src/redux/auth/authApiSlice";
import { Button } from "../ui";
import { IconCross } from "src/components/icons";
import { useNavigate } from "react-router-dom";
import useWindowSize from "src/hooks/useWindowSize";
import { useState } from "react";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const [trigger] = authApiSlice.useLazyGetLoggedUserQuery();
  const [login] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { register, handleSubmit, reset } = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onNavigateToRegister = () => navigate("/auth/register");
  const onNavigateToHome = () => navigate("/");

  const onSubmit = async (data: ILoginSchema) => {
    await login(data)
      .unwrap()
      .then(async () => await trigger())
      .catch((error) => {
        if (error.originalStatus === 401) {
          setErrorMessage(error.data);
        } else {
          setErrorMessage("Something went wrong");
        }
      });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative px-5 pt-10 640:px-10"
    >
      {width < 768 && (
        <div
          onClick={onNavigateToHome}
          className="absolute left-5 top-0  cursor-pointer 640:left-10"
        >
          <IconCross size="20" />
        </div>
      )}

      <div className="mb-10 text-center text-[2.5rem] font-semibold text-white">
        <h2 className="leading-5">Hello!</h2>
        <h2>Welcome Back</h2>
      </div>

      <div className="mb-5 flex flex-col gap-5">
        <div className="h-14">
          <input
            className="h-full w-full rounded-xl border border-[#66666659/35] px-5 focus:outline-none"
            placeholder="Enter Email Address"
            {...register("email")}
          />
        </div>
        <div className="h-14">
          <input
            className="h-full w-full rounded-xl border border-[#66666659/35] px-5 focus:outline-none"
            type="password"
            placeholder="Enter Password"
            {...register("password")}
          />
        </div>
      </div>

      <p className="mb-8 cursor-pointer text-end font-light text-white">
        forgot password ?
      </p>

      {errorMessage && (
        <div className="mb-3 flex items-center rounded-xl border border-[#F83A05] p-3 px-5">
          <p className="text-[#F83A05]">{errorMessage}</p>
        </div>
      )}

      <Button variant="tertiary" className="mb-9 w-full px-5">
        Sign In
      </Button>

      {/* <p className="mb-11 text-center text-lg text-white">
        ---------- or continue with ----------
      </p>

      <div className="mb-11 flex justify-center gap-10">
        <div className="flex h-[3.25rem] w-[5.375rem] cursor-pointer items-center justify-center rounded-[10px] bg-white">
          <IconGoogle />
        </div>
        <div className="flex h-[3.25rem] w-[5.375rem] cursor-pointer items-center justify-center rounded-[10px] bg-white">
          <IconGoogle />
        </div>
        <div className="flex h-[3.25rem] w-[5.375rem] cursor-pointer items-center justify-center rounded-[10px] bg-white">
          <IconGoogle />
        </div>
      </div> */}

      <div className="flex justify-between text-white">
        <p className="font-light">don’t have an account?</p>
        <p onClick={onNavigateToRegister} className="cursor-pointer font-bold">
          Sign up!
        </p>
      </div>
    </form>
  );
};
