import { Consultation } from "../../../models/Consultation";
import { api } from "../../../utils/axios";

interface FindAllConsultationsParams {
  client?: string;
  nutritionist?: string;
}

export async function findAllConsultationsApi(
  filters?: FindAllConsultationsParams,
): Promise<Consultation[]> {
  const params = new URLSearchParams();
  if (filters && filters.client) params.append("client", filters.client);
  if (filters && filters.nutritionist)
    params.append("nutritionist", filters.nutritionist);

  const response = await api.get("/consultation", { params });
  return response.data.data;
}
