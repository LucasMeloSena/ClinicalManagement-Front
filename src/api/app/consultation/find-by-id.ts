import { Consultation } from "../../../models/Consultation";
import { api } from "../../../utils/axios";

export async function findConsultationByIdApi(
  id: string,
): Promise<Consultation> {
  const response = await api.get(`/consultation/${id}`);
  return response.data.data;
}
