import { Nutritionist } from "../../../models/Nutritionist";
import { api } from "../../../utils/axios";

export async function findAllNutritionistsApi(): Promise<Nutritionist[]> {
  const response = await api.get("/nutritionist");
  return response.data.data;
}
