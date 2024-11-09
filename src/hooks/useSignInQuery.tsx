import { useMutation } from "@tanstack/react-query";
import { signInApi } from "../api/auth/sign-in";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

export function useSignInQuery() {
  const navigate = useNavigate();
  const { signIn } = useAuth()

  const loginNutritionist = useMutation({
    mutationKey: ["nutritionist-login"],
    mutationFn: signInApi,
    onSuccess: (response) => {
      signIn({ nutritionist: response.nutritionist, token: response.token });
      navigate("/consultations", { replace: true });
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) toast.warning("Credenciais inválidas!");
      else
        toast.warning(
          "Ocorreu um erro ao fazer o login. Por favor, tente novamente.",
        );
    },
  });

  return { loginNutritionist };
}
