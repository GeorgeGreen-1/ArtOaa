import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "src/redux/auth/authSlice";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainInfoFormSchema, MainInfoFormSchemaType } from "./Schemas";

import {
  IconDefaultProfile,
  IconLock,
  IconUploadImg,
} from "src/components/icons";
import { Button } from "src/components/ui";
import { useEditUserMainInfoMutation } from "src/redux/users/usersApiSlice";

export const MainInfo = () => {
  const loggedUser = useSelector(selectCurrentUser);

  const { register, handleSubmit, setValue } = useForm<MainInfoFormSchemaType>({
    resolver: zodResolver(MainInfoFormSchema),
    defaultValues: {
      firstName: loggedUser?.firstName || "",
      lastName: loggedUser?.lastName || "",
      profileImage: "",
    },
  });

  const hiddenInputRef = useRef<HTMLInputElement>(null!);

  const [preview, setPreview] = useState<string | undefined>(
    loggedUser?.profileImage,
  );

  const { ref: registerRef, ...rest } = register("profileImage");

  const onUpload = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current?.click();
    }
  };

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files as FileList)?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result as ArrayBuffer], {
          type: file.type,
        });
        setPreview(URL.createObjectURL(blob));
        setValue("profileImage", blob);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const [editProfile] = useEditUserMainInfoMutation();

  const onSubmit: SubmitHandler<MainInfoFormSchemaType> = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("profileImage", data.profileImage);

    await editProfile(formData)
      .unwrap()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="h-full w-full 768:w-[38rem] 834:w-[40rem] 1024:w-[45rem] 1280:w-[50rem] 1440:w-[60rem] 1536:w-[62rem] 1592:w-[65rem]">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="flex flex-col gap-5 ">
            <input
              type="file"
              hidden
              {...rest}
              name="profileimage"
              onChange={handleUploadedFile}
              ref={(e) => {
                registerRef(e);
                if (e) {
                  hiddenInputRef.current = e;
                }
              }}
            />
            <div
              onClick={onUpload}
              className="flex h-[12.125rem] w-[12.125rem] cursor-pointer items-center justify-center rounded-[1.5625rem] border-2 bg-[#D9D9D9] transition-all hover:bg-white 1024:h-[15.9375rem] 1024:w-[16.25rem]"
            >
              {preview ? (
                <img
                  src={preview}
                  className="h-full w-full rounded-[1.5625rem]"
                  alt="img"
                />
              ) : (
                <IconDefaultProfile />
              )}
            </div>
            <div
              onClick={onUpload}
              className="flex cursor-pointer flex-row items-center justify-center gap-[0.625rem] self-center"
            >
              <IconUploadImg />
              <p className="text-base font-semibold">
                {preview ? "Change" : "Upload"}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-[0.625rem] 768:flex-row">
            <div className="flex w-full flex-col ">
              <label className="self-start">First Name</label>
              <input
                className="rounded-xl border border-[#66666659] px-5 py-3 outline-none"
                type="text"
                {...register("firstName")}
              />
            </div>

            <div className="flex w-full flex-col ">
              <label className="self-start">Last Name</label>
              <input
                className="rounded-xl border border-[#66666659] px-5 py-3 outline-none"
                type="text"
                {...register("lastName")}
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center gap-2 bg-[#37474f1f] 768:gap-5">
            <div className="flex items-center justify-center bg-[#37474f94] px-6 py-5 768:px-8 ">
              <IconLock />
            </div>
            <p>
              We keep your data private and never share it with third-parties.
            </p>
          </div>
          <Button type="submit" className="mt-2 768:w-1/3" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
