import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BodyBiotype, bodyBiotypeOptions } from "../../models/Client";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { ClientForm, UpdateClientForm } from "./form";
import { useClientsQueries } from "../../hooks/useClientsQueries";
import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog } from "../dialog";

interface ClientCardProps {
  client: {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    cpf: string;
    bodyBiotype: BodyBiotype;
    deletedAt?: Date;
  };
}

export default function ClientCard({ client }: ClientCardProps) {
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const { updateClient, deleteClient } = useClientsQueries();

  const handleUpdateClient = async (data: UpdateClientForm) => {
    await updateClient.mutateAsync({
      ...data,
      id: client._id ?? "",
      birthDate: data.birthDate?.toDate(),
      bodyBiotype: data.bodyBiotype?.name,
    });
    setUpdateDialogVisible(false);
  };

  const handleDeleteClient = async (id: string) => {
    await deleteClient.mutateAsync(id);
    setDeleteDialogVisible(false);
  };

  return (
    <>
      <Dialog
        open={updateDialogVisible}
        onClose={() => setUpdateDialogVisible(false)}
        title="Atualizar Cliente"
      >
        <ClientForm<UpdateClientForm>
          mode="update"
          onSubmit={handleUpdateClient}
          initialData={{
            ...client,
            birthDate: dayjs(client.birthDate),
            bodyBiotype: bodyBiotypeOptions.filter(
              (item) => item.name == client.bodyBiotype,
            )[0],
          }}
        />
      </Dialog>

      <Dialog
        open={deleteDialogVisible}
        onClose={() => setDeleteDialogVisible(false)}
        title="Desativar Cliente"
      >
        <div className="flex flex-col gap-4">
          <h2>Você tem certeza que deseja desativar este cliente?</h2>
          <LoadingButton
            variant="contained"
            onClick={() => handleDeleteClient(client._id ?? "")}
          >
            Confirmar
          </LoadingButton>
        </div>
      </Dialog>

      <Card sx={{ minWidth: 275 }}>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-row">
            <Typography variant="h5" component="div">
              {client.name}
            </Typography>
            <div className="flex flex-grow flex-row justify-end">
              <IconButton onClick={() => setUpdateDialogVisible(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setDeleteDialogVisible(true)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>

          <div>
            <Typography variant="body2" color="text.secondary">
              Email: {client.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Celular: {client.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data Nascimento: {dayjs(client.birthDate).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CPF: {client.cpf}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Biotipo Corporal: {client.bodyBiotype}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {client.deletedAt ? "🔴 Inativo" : "🟢 Ativo"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
