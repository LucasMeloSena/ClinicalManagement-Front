import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createConsultationApi } from "../api/app/consultation/create";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { QueriesKeys } from "../utils/enums/queries-keys";
import { findAllConsultationsApi } from "../api/app/consultation/find-all";

export const useConsultationQueries = (params: {nutritionistId: string}) => {
  const queryClient = useQueryClient();

  const createConsultation = useMutation({
    mutationKey: [QueriesKeys.CreateConsultation],
    mutationFn: createConsultationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueriesKeys.FindAllConsultations],
      });
      toast.success("Consulta criada com sucesso!");
    },
    onError: (error: AxiosError) => {
      if (error.status === 422)
        toast.warning("A data fornecida é anterior a data atual.");
      else
        toast.warning(
          "Ocorreu um erro ao criar esta consulta. Por favor, tente novamente",
        );
    },
  });

  const { data: consultations } = useQuery({
    queryKey: [QueriesKeys.FindAllConsultations],
    queryFn: () => findAllConsultationsApi({nutritionistId: params.nutritionistId}),
    enabled: !!params.nutritionistId
  });

  return {
    createConsultation,
    consultations,
  };
};
