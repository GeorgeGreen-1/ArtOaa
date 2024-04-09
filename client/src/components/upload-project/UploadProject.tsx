import { useState } from "react";
import { IconProjectImagesUpload, IconRedCross } from "src/components/icons";
import { Button } from "src/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { UploadProjectSchema, UploadProjectSchemaType } from "./Schema";
import { useAddProjectMutation } from "src/redux/users/usersApiSlice";

export const UploadProject = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UploadProjectSchemaType>({
    resolver: zodResolver(UploadProjectSchema),
    defaultValues: {
      images: [],
    },
  });
  const [addProject] = useAddProjectMutation();

  const [previewImages, setPreviewImages] = useState<Blob[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null!);

  const onUpload = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const newPreviewImages: Blob[] = [];
    const newImageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newPreviewImages.push(file);

      const imageUrl = URL.createObjectURL(file);

      newImageUrls.push(imageUrl);
    }

    setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages]);
    setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
    setValue("images", [...previewImages, ...newPreviewImages]);
  };

  const handleRemoveImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    const newImageUrls = [...imageUrls];

    newPreviewImages.splice(index, 1);
    newImageUrls.splice(index, 1);

    setPreviewImages(newPreviewImages);
    setImageUrls(newImageUrls);
    setValue("images", newPreviewImages);
  };

  const onSubmit: SubmitHandler<UploadProjectSchemaType> = async (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append(`personalProjects`, data.images[i]);
    }
    // console.log(
    //   "FormData entries:",
    //   [...formData.entries()]
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join(", "),
    // );
    await addProject(formData)
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-full w-full flex-col justify-center gap-5 px-10 py-[10rem] 768:flex-row-reverse">
        <div className="flex flex-col gap-5 768:w-[30%]">
          <div
            onClick={onUpload}
            className="flex h-[12rem] w-full cursor-pointer flex-col items-center justify-center gap-2 self-center rounded-[1.125rem] border-b-4 border-l-4 border-r-0 border-t-0 border-[#F83A05] bg-white hover:bg-gray-400/90 540:h-[14rem] 768:h-[15rem]"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[50%] bg-[#5E5E5E]">
              <IconProjectImagesUpload />
              <input
                type="file"
                ref={hiddenInputRef}
                onChange={handleUploadedFile}
                multiple
                style={{ display: "none" }}
              />
            </div>
            <p className="text-base">Upload Images</p>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="h-[2.5rem] w-full self-center"
          >
            Publish
          </Button>
        </div>
        <div
          className={`flex h-full w-full flex-col gap-5 ${previewImages.length > 0 ? "768:w-[70%]" : "w-0"}`}
        >
          <div
            className={`grid min-h-[23.75rem] ${previewImages.length === 0 ? "place-content-center place-items-center" : "grid-cols-2"} gap-5 rounded-[1.25rem] border-b-4 border-l-4 border-r-0 border-t-0  border-[#F83A05] bg-gray-300 p-5 540:min-h-[27.75rem] 768:min-h-[31.75rem]  1024:min-h-[35.75rem] 1280:min-h-[39.75rem] 1440:min-h-[43.75rem] 1536:min-h-[47.75rem]`}
          >
            {errors.images && previewImages.length === 0 && (
              <p className="text-xl font-semibold text-[#F83A05]">
                Minimum one image is required
              </p>
            )}
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className="relative w-full">
                <img
                  src={imageUrl}
                  className="h-[10rem] w-full rounded-[1.25rem] 540:h-[12rem] 768:h-[14rem] 1024:h-[16rem] 1280:h-[18rem] 1440:h-[20rem] 1536:h-[22rem]"
                  alt={`preview-${index}`}
                />
                <div
                  className="absolute right-5 top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-white hover:bg-black"
                  onClick={() => handleRemoveImage(index)}
                >
                  <IconRedCross />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
