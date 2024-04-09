import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormSchema, OrderFormSchemaType } from "./OrderFormSchema";
import { ArtStyleOptions, WallImageOptions } from "src/components/shared";
import { Button, Loading, Modal } from "src/components/ui";
import { IconCross, IconUploadImg } from "src/components/icons";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { useCreateOrderMutation } from "src/redux/orders/ordersApiSlice";

type Props = {
  closeDialog: () => void;
  dialogState: string | null;
};

export const OrderForm: React.FC<Props> = ({ closeDialog, dialogState }) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [businessType, setBusinessType] = useState<"Individual" | "Corporate">(
    "Individual",
  );
  const [artPosition, setArtPosition] = useState<"Interior" | "Exterior">(
    "Exterior",
  );
  const [preview, setPreview] = useState<string | undefined>();
  const hiddenInputRef = useRef<HTMLInputElement>(null!);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<OrderFormSchemaType>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      location: "",
      artStyles: [
        {
          value: "mosaic",
          label: "Mosaic",
        },
      ],
      wallImageSize: {
        value: "",
        label: "",
      },
      description: "",
      wallImage: "",
    },
  });

  const { ref: registerRef, ...rest } = register("wallImage");

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
        setValue("wallImage", blob);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const onSubmit: SubmitHandler<OrderFormSchemaType> = async (data) => {
    const formData = new FormData();

    formData.append("wallImage", data.wallImage);
    formData.append("description", data.description);
    formData.append("artLocation", data.location);
    formData.append("businessType", businessType);
    formData.append("artPosition", artPosition);
    formData.append("artDimension", data.wallImageSize.value);

    data.artStyles.forEach((style, index) => {
      formData.append(`artStyle[${index}][name]`, style.label);
    });

    await createOrder(formData)
      .unwrap()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  if (isLoading) return <Loading />;

  return (
    <Modal closeDialog={closeDialog} isModalOpen={dialogState === "open"}>
      <div className="modal-scrollbar h-screen w-screen self-center overflow-y-scroll border-4 border-r-0 border-t-0 border-b-[#F83A05] border-l-[#F83A05] bg-white px-5 py-16 768:h-[90vh] 768:w-[35rem] 768:rounded-3xl 1024:px-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full items-center justify-between">
            <h1 className="border-b-4 border-[#F83A05] pb-2 pr-5 text-3xl text-black">
              Create new order
            </h1>
            <div className="cursor-pointer self-end pb-2" onClick={closeDialog}>
              <IconCross />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <h1 className="mt-10 text-lg">Order Information</h1>
            <div className="mt-3 flex h-10 w-full items-center justify-around rounded-lg bg-[#D9D9D9]">
              <p
                className={`flex w-32 cursor-pointer items-center justify-center rounded-md ${
                  businessType === "Individual" ? "bg-white" : "bg-[#D9D9D9]"
                }`}
                onClick={() => setBusinessType("Individual")}
              >
                Individual
              </p>
              <p
                className={`flex w-32 cursor-pointer items-center justify-center rounded-md ${
                  businessType === "Corporate" ? "bg-white" : "bg-[#D9D9D9]"
                }`}
                onClick={() => setBusinessType("Corporate")}
              >
                Corporate
              </p>
            </div>
            <div className="mb-3 mt-3 flex h-10 w-full items-center justify-around rounded-lg bg-[#D9D9D9]">
              <p
                className={`flex w-32 cursor-pointer items-center justify-center rounded-md ${
                  artPosition === "Interior" ? "bg-white" : "bg-[#D9D9D9]"
                }`}
                onClick={() => setArtPosition("Interior")}
              >
                Interior
              </p>
              <p
                className={`flex w-32 cursor-pointer items-center justify-center rounded-md ${
                  artPosition === "Exterior" ? "bg-white" : "bg-[#D9D9D9]"
                }`}
                onClick={() => setArtPosition("Exterior")}
              >
                Exterior
              </p>
            </div>

            <Controller
              control={control}
              name="wallImageSize"
              render={({ field }) => (
                <Creatable
                  options={WallImageOptions}
                  {...field}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      borderRadius: "0.75rem",
                      border: `1px solid ${errors.wallImageSize ? "#F83A05" : "#66666659"}`,
                      outline: "none",
                      padding: "0.35rem 0.5rem",
                      width: "100%",
                      boxShadow: "none",
                      "&:hover": {
                        border: `1px solid ${errors.wallImageSize ? "#F83A05" : "#66666659"}`,
                      },
                    }),
                  }}
                />
              )}
            />
            <span className="mt-[2px] h-10 text-sm font-semibold text-[#F83A05]">
              {errors.wallImageSize ? "Wall image size is required" : ""}
            </span>
            <div
              onClick={onUpload}
              className={`flex h-[18.4375rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg border ${preview === undefined && errors.wallImage ? "border-[#F83A05]" : "border-[#66666659]"} transition-all hover:bg-[#66666659]`}
            >
              <input
                type="file"
                hidden
                {...rest}
                name="wallImage"
                onChange={handleUploadedFile}
                ref={(e) => {
                  registerRef(e);
                  if (e) {
                    hiddenInputRef.current = e;
                  }
                }}
              />
              {preview ? (
                <img
                  src={preview}
                  className="h-full w-full rounded-lg"
                  alt="img"
                />
              ) : (
                <>
                  <IconUploadImg
                    color={
                      preview === undefined && errors.wallImage
                        ? "#F83A05"
                        : "#222222"
                    }
                  />
                  <p
                    className={`text-base ${preview === undefined && errors.wallImage ? "text-[#F83A05]" : ""}`}
                  >
                    Upload wall picture
                  </p>
                </>
              )}
            </div>
            <span className="mt-[2px] h-10 text-sm font-semibold text-[#F83A05]">
              {preview === undefined && errors.wallImage
                ? "Wall Image is Required"
                : ""}
            </span>
            <input
              className={`rounded-xl border ${errors.location ? "border-[#F83A05]" : "border-[#66666659]"} px-5 py-3 outline-none`}
              type="text"
              {...register("location")}
              placeholder="Location"
            />
            <span className="mt-[2px] h-10 text-sm font-semibold text-[#F83A05]">
              {errors.location ? "Required and at least 5 character" : ""}
            </span>

            <textarea
              className={`h-[8.5rem] resize-none rounded-xl border ${errors.description ? "border-[#F83A05]" : "border-[#66666659]"} px-5 py-3 outline-none`}
              {...register("description")}
              placeholder="Add order Description"
            />
            <span className="mt-[2px] h-10 text-sm font-semibold text-[#F83A05]">
              {errors.description ? "Required and at least 5 character" : ""}
            </span>
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
                      border: `1px solid  ${errors.artStyles ? "#F83A05" : "#66666659"}`,
                      outline: "none",
                      padding: "0.35rem 0.5rem",
                      width: "100%",
                      boxShadow: "none",
                      "&:hover": {
                        border: `1px solid ${errors.artStyles ? "#F83A05" : "#66666659"}`,
                      },
                    }),
                  }}
                />
              )}
            />
            <span className="mt-[2px] h-10 text-sm font-semibold text-[#F83A05]">
              {errors.artStyles ? "Required and at least 1 genre" : ""}
            </span>
            <Button
              type="submit"
              className="w-[15rem] self-center"
              variant="primary"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
