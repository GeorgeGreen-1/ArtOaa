import { createBrowserRouter } from "react-router-dom";
import { TryAuth } from "src/components/shared/TryAuth";
import { rootRoutes } from "./routes/rootRoutes";
import { authRoutes } from "./routes/authRoutes";

export const router = createBrowserRouter([
  {
    element: <TryAuth />,
    children: [rootRoutes, authRoutes],
  },
]);