import { Spinner } from "./Spinner";

export const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-[100] flex min-h-screen w-full items-center justify-center bg-[#121212]">
      <Spinner />
    </div>
  );
};
