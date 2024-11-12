import { api } from "../../../utils/axios";

export async function deleteConsultationApi(id: string) {
  await api.delete(`/consultation/${id}`);
}
