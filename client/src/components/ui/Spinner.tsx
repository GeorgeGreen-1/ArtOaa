export const Spinner = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative flex h-12 w-12 items-center justify-center bg-[#222222]">
        <div className="animate-spinner-box absolute h-3 w-3 bg-[#FCA311]"></div>
        <div className="h-6 w-6 bg-[#121212]"></div>
      </div>
      <p className="mt-4 text-xl font-semibold text-[#FCA311]">Loading</p>
    </div>
  );
};
