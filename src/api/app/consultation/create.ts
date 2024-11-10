import { api } from "../../../utils/axios";

interface CreateConsultationParams {
  startAt: Date;
  endAt: Date;
  clientId: string;
  nutritionistId: string;
}

export async function createConsultationApi(body: CreateConsultationParams) {
  await api.post("consultation", body);
}
