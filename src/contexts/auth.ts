import { createContext, useContext } from "react";
import { Nutritionist } from "../models/Nutritionist";

interface AuthContextType {
  nutritionist?: Nutritionist;
  signIn: (data: { nutritionist: Nutritionist; token: Record<string, string> }) => void;
  signOut: () => void;
  authenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth error.");
  }
  return context;
};
