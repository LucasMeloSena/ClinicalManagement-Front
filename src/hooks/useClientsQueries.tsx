import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueriesKeys } from "../utils/enums/queries-keys";
import { findAllClientsApi } from "../api/app/clients/find-all";
import { createClientApi } from "../api/app/clients/create";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { updateClientApi } from "../api/app/clients/update";
import { deleteClientApi } from "../api/app/clients/delete";

export function useClientsQueries() {
  const queryClient = useQueryClient();

  const createClient = useMutation({
    mutationKey: [QueriesKeys.CreateClient],
    mutationFn: createClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueriesKeys.FindAllClients],
      });
      toast.success("Cliente criado com sucesso!");
    },
    onError: (error: AxiosError) => {
      if (error.status === 409)
        toast.warning("Já existe um cliente cadastro com estes dados.");
      else
        toast.warning(
          "Ocorreu um erro ao criar este cliente. Por favor, tente novamente",
        );
    },
  });

  const updateClient = useMutation({
    mutationKey: [QueriesKeys.UpdateClient],
    mutationFn: updateClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueriesKeys.FindAllClients],
      });
      toast.success("Cliente atualizado com sucesso!");
    },
    onError: () => {
      toast.warning(
        "Ocorreu um erro ao atualizar este cliente. Por favor, tente novamente",
      );
    },
  });

  const deleteClient = useMutation({
    mutationKey: [QueriesKeys.DeleteClient],
    mutationFn: deleteClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueriesKeys.FindAllClients],
      });
      toast.success("Cliente excluido com sucesso!");
    },
    onError: () => {
      toast.warning(
        "Ocorreu um erro ao excluir este cliente. Por favor, tente novamente",
      );
    },
  });

  const { data: clients } = useQuery({
    queryKey: [QueriesKeys.FindAllClients],
    queryFn: () => findAllClientsApi(),
  });

  return {
    clients,
    createClient,
    updateClient,
    deleteClient,
  };
}
