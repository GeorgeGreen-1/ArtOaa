import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconTick } from "src/components/icons";
import { Button } from "src/components/ui";
import { useVerifyEmailMutation } from "src/redux/auth/authApiSlice";

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifyEmail] = useVerifyEmailMutation();

  const emailToken = searchParams.get("emailToken") as string;

  const onNavigateToLogin = () => navigate("/auth/login");

  const sendVerify = async () => {
    await verifyEmail(emailToken)
      .unwrap()
      .then(() => console.log("success"))
      .catch((error) => console.log(error.data.message));
  };

  useEffect(() => {
    sendVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center rounded-[1.875rem] bg-white px-7 shadow-[-6px_4px_0_0_rgba(248,58,5,1)]">
      <div className="b mb-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#36CDBB]">
        <IconTick />
      </div>

      <div className="mb-10 text-center">
        <h2 className="mb-5 text-3xl font-medium">Success</h2>
        <h3 className="text-xl font-medium">
          Your email has been successfully verified!
        </h3>
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
