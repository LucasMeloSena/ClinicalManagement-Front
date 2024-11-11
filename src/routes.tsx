import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./pages/_layouts/app";
import { PrivateRoute } from "./private-routes";
import { Consultations } from "./pages/app/consultations";
import { Clients } from "./pages/app/clients";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/consultations",
        element: <PrivateRoute element={<Consultations />} />,
      },
      {
        path: "/clients",
        element: <PrivateRoute element={<Clients />} />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
