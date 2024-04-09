import { AuthLayout } from "src/layouts";
import { RegisterPage, LoginPage, VerifyEmailPage } from "src/pages";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "verify-email",
      element: <VerifyEmailPage />,
    },
  ],
};
