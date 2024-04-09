import { useState } from "react";
import { RegisterForm, SuccessMessage } from "src/components/register";

export function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <>
      {isSuccess ? (
        <SuccessMessage />
      ) : (
        <RegisterForm setIsSuccess={setIsSuccess} />
      )}
    </>
  );
}
