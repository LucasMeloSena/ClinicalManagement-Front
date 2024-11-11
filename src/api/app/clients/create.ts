import { BodyBiotype } from "../../../models/Client";
import { api } from "../../../utils/axios";

interface CreateClientParams {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  cpf: string;
  bodyBiotype: BodyBiotype;
}

export async function createClientApi(body: CreateClientParams) {
  await api.post("client", body);
}
