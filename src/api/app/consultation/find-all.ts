import { Consultation } from "../../../models/Consultation";
import { api } from "../../../utils/axios";

interface FindAllConsultationsParams {
  clientId?: string;
  nutritionistId?: string;
}

export async function findAllConsultationsApi(
  filters?: FindAllConsultationsParams,
): Promise<Consultation[]> {
  const params = new URLSearchParams();
  if (filters && filters.clientId) params.append("client_id", filters.clientId);
  if (filters && filters.nutritionistId)
    params.append("nutritionist_id", filters.nutritionistId);

  const response = await api.get("/consultation", { params });
  return response.data.data;
}
