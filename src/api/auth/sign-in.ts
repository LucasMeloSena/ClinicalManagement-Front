import axios from "axios";
import { Nutritionist } from "../../models/Nutritionist";

interface SignInApiProps {
  email: string;
  password: string;
}

interface SingInResponse {
  nutritionist: Nutritionist;
  token: Record<string, string>;
}

export async function signInApi(body: SignInApiProps): Promise<SingInResponse> {
  const response = await axios.post("http://0.0.0.0:3001/nutritionist/login", body);
  return {
    nutritionist: response.data.data.nutritionist,
    token: response.data.data.token,
  };
}
