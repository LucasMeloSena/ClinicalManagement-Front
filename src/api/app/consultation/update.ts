import { api } from "../../../utils/axios";

interface UpdateConsultationParams {
  id: string;
  startAt?: Date;
  endAt?: Date;
  client?: string;
  nutritionist?: string;
}

export async function updateConsultationApi(body: UpdateConsultationParams) {
  await api.put(`/consultation/${body.id}`, body);
}
