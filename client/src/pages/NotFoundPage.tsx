import { useNavigate } from "react-router-dom";
import { Button } from "src/components/ui";

export function NotFoundPage() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[url('/assets/images/not-found/404-page.png')] bg-cover bg-no-repeat">
      <h2 className="mb-4 text-4xl font-bold leading-[3rem] text-[#FCA311] drop-shadow-red-outline-mobile 540:text-5xl 768:text-6xl 1024:text-7xl 1280:text-8xl 1280:drop-shadow-red-outline-desktop 1536:text-[8.75rem]">
        404
      </h2>
      <h3 className="mb-10 text-4xl text-[#FCA311] drop-shadow-red-outline-mobile 540:text-5xl 768:text-6xl 1024:text-7xl 1280:text-8xl 1280:drop-shadow-red-outline-desktop 1536:text-[8rem]">
        Page not found!
      </h3>

      <Button onClick={navigateToHome}>Go to homepage</Button>
    </div>
  );
}
