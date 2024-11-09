import { Nutritionist } from "../../models/Nutritionist";
import { api } from "../../utils/axios";

interface SignInApiProps {
  email: string;
  password: string;
}

interface SingInResponse {
  nutritionist: Nutritionist;
  token: Record<string, string>;
}

export async function signInApi(body: SignInApiProps): Promise<SingInResponse> {
  const response = await api.post("/nutritionist/login", body);
  return {
    nutritionist: response.data.data.nutritionist,
    token: response.data.data.token,
  };
}
