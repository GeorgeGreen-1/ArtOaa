import { useState } from "react";
import { RegisterForm, SuccessMessage } from ".";

export const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return isSuccess ? (
    <SuccessMessage />
  ) : (
    <RegisterForm setIsSuccess={setIsSuccess} />
  );
};
