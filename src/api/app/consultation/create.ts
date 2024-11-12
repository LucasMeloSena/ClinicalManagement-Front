import { api } from "../../../utils/axios";

interface CreateConsultationParams {
  startAt: Date;
  endAt: Date;
  client: string;
  nutritionist: string;
  intervalOfDaysToRepeat?: number;
}

export async function createConsultationApi(body: CreateConsultationParams) {
  await api.post("consultation", body);
}
