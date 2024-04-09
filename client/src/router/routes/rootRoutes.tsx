import { AuthGuard } from "src/components/shared";
import { RootLayout } from "src/layouts";

import {
  HomePage,
  NotFoundPage,
  AboutPage,
  ArtistsPage,
  ContactPage,
  EditProfilePage,
  OrdersPage,
  OrderDetailsPage,
  ProfilePage,
  UploadProjectPage,
  ServicesPage,
} from "src/pages";

export const rootRoutes = {
  path: "/",
  element: <RootLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "about",
      element: <AboutPage />,
    },
    {
      path: "artists",
      element: <ArtistsPage />,
    },
    {
      path: "contact",
      element: <ContactPage />,
    },
    {
      path: "orders",
      element: <OrdersPage />,
    },
    {
      path: "orders/:orderID",
      element: <OrderDetailsPage />,
    },
    {
      path: "services",
      element: <ServicesPage />,
    },
    {
      path: "profile/:profileID",
      element: <ProfilePage />,
    },
    {
      path: "upload-project",
      element: <UploadProjectPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      element: <AuthGuard />,
      children: [
        {
          path: "edit-profile",
          element: <EditProfilePage />,
        },
      ],
    },
  ],
};
