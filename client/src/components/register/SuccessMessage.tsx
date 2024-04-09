import { useNavigate } from "react-router-dom";
import { IconMailPost } from "src/components/icons";
import { Button } from "src/components/ui/Button";

export const SuccessMessage = () => {
  const navigate = useNavigate();

  const onNavigateToLogin = () => navigate("/auth/login");

  return (
    <div className="my-auto flex min-h-[90vh] flex-col items-center justify-center rounded-[1.875rem] bg-white px-4 py-10 shadow-[-6px_4px_0_0_rgba(248,58,5,1)] 768:w-[70%] 768:p-10 1024:w-[60%] 1440:px-20">
      <div className="mb-14">
        <IconMailPost />
      </div>

      <div className="mb-12 text-center">
        <h2 className="mb-5 text-3xl font-medium">Verify your email!</h2>
        <p className="mb-3 text-lg font-medium">
          Your account has been successfully registered
        </p>
        <p className="text-lg font-medium">
          To complete the process please check your email for a validation
          request.
        </p>
      </div>

      <Button
        onClick={onNavigateToLogin}
        variant="tertiary"
        className="h-14 w-full rounded-lg text-white"
      >
        Login
      </Button>
    </div>
  );
};
