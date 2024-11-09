import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Nutritionist } from "../models/Nutritionist";
import { api } from "../utils/axios";
import { AuthContext } from "../contexts/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [nutritionist, setNutritionist] = useState<Nutritionist>();
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("@Auth:token");
  });

  useEffect(() => {
    const storedNutritionist = localStorage.getItem("@Auth:nutritionist");
    const storedToken = localStorage.getItem("@Auth:token");

    if (storedNutritionist && storedToken) {
      const nutritionistData = JSON.parse(storedNutritionist);
      setNutritionist(nutritionistData);
      setAuthenticated(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const signIn = (data: {
    nutritionist: Nutritionist;
    token: Record<string, string>;
  }) => {
    setNutritionist(data.nutritionist);
    setAuthenticated(true);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    localStorage.setItem(
      "@Auth:nutritionist",
      JSON.stringify(data.nutritionist),
    );
    localStorage.setItem("@Auth:token", JSON.stringify(data.token));
  };

  const signOut = () => {
    localStorage.clear();
    setNutritionist(undefined);
    setAuthenticated(false);
    return <Navigate to={"/sign-in"} replace={true} />;
  };

  return (
    <AuthContext.Provider
      value={{
        nutritionist,
        signIn,
        signOut,
        authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
