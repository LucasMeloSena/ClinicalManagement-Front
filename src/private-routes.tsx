import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/auth";

interface PrivateRouteProps {
  element: ReactElement;
}

export function PrivateRoute({ element }: PrivateRouteProps) {
  const { authenticated } = useAuth()

  return authenticated ? element : <Navigate to="/sign-in?session=inactive" />;
}
