import { Client } from "../../../models/Client";
import { api } from "../../../utils/axios";

interface FindAllClientsParams {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  deleted_at?: string;
}

export async function findAllClientsApi(
  filters?: FindAllClientsParams,
): Promise<Client[]> {
  const params = new URLSearchParams();
  if (filters && filters.name) params.append("name", filters.name);
  if (filters && filters.email) params.append("email", filters.email);
  if (filters && filters.phone) params.append("phone", filters.phone);
  if (filters && filters.cpf) params.append("cpf", filters.cpf);
  if (filters && filters.deleted_at)
    params.append("deleted_at", filters.deleted_at);

  const response = await api.get("/client", { params });
  return response.data.data;
}
