import { useQuery } from "@tanstack/react-query";
import { QueriesKeys } from "../utils/enums/queries-keys";
import { findAllNutritionistsApi } from "../api/app/nutritionists/find-all";

export function useNutritionistQueries() {
  const { data: nutritionists } = useQuery({
    queryKey: [QueriesKeys.FindAllNutritionists],
    queryFn: () => findAllNutritionistsApi(),
  });

  return {
    nutritionists,
  };
}
