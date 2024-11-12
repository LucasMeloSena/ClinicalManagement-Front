import { api } from "../../../utils/axios";

export async function deleteClientApi(id: string) {
  await api.delete(`/client/${id}`);
}
