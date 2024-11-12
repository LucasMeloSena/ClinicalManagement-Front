import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createConsultationApi } from "../api/app/consultation/create";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { QueriesKeys } from "../utils/enums/queries-keys";
import { findAllConsultationsApi } from "../api/app/consultation/find-all";
import { findConsultationByIdApi } from "../api/app/consultation/find-by-id";
import { updateConsultationApi } from "../api/app/consultation/update";
import { deleteConsultationApi } from "../api/app/consultation/delete";

interface HookParams {
  id?: string;
  nutritionist?: string;
}

export const useConsultationQueries = (params: HookParams) => {
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

  const updateConsultation = useMutation({
    mutationKey: [QueriesKeys.UpdateConsultation],
    mutationFn: updateConsultationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueriesKeys.FindAllConsultations],
      });
      toast.success("Consulta atualizada com sucesso!");
    },
    onError: () => {
      toast.warning(
        "Ocorreu um erro ao atualizar a consulta. Por favor, tente novamente.",
      );
    },
  });

  const deleteConsultation = useMutation({
    mutationKey: [QueriesKeys.DeleteConsultation],
    mutationFn: deleteConsultationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueriesKeys.FindAllConsultations],
      });
      toast.success("Consulta excluida com sucesso!");
    },
    onError: () => {
      toast.warning(
        "Ocorreu um erro ao excluir a consulta. Por favor, tente novamente.",
      );
    },
  });

  const { data: consultations } = useQuery({
    queryKey: [QueriesKeys.FindAllConsultations],
    queryFn: () =>
      findAllConsultationsApi({ nutritionist: params.nutritionist }),
    enabled: !!params.nutritionist,
  });

  const { data: consultation } = useQuery({
    queryKey: [QueriesKeys.FindConsultationById, params?.id],
    queryFn: () => findConsultationByIdApi(params?.id ?? ""),
    enabled: !!params?.id,
  });

  return {
    createConsultation,
    updateConsultation,
    deleteConsultation,
    consultations,
    consultation,
  };
};
