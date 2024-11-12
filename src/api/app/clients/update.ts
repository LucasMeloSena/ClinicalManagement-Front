import { BodyBiotype } from "../../../models/Client";
import { api } from "../../../utils/axios";

interface UpdateClientParams {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: Date;
  cpf?: string;
  bodyBiotype?: BodyBiotype;
}

export async function updateClientApi(body: UpdateClientParams) {
  await api.put(`client/${body.id}`, body);
}
