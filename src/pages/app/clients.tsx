import { Button } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useClientsQueries } from "../../hooks/useClientsQueries";
import ClientCard from "../../components/clients/card";
import { useState } from "react";
import { Dialog } from "../../components/dialog";
import { ClientForm, RegisterClientForm } from "../../components/clients/form";

export function Clients() {
  const [dialogVisible, setDialogVisible] = useState(false);

  const { clients, createClient } = useClientsQueries();
  console.log(clients)

  const handleRegisterClient = async (data: RegisterClientForm) => {
    const info = {
      ...data,
      birthDate: new Date(data.birthDate.toDate()),
      bodyBiotype: data.bodyBiotype.name,
    };
    await createClient.mutateAsync(info);
    setDialogVisible(false);
  };

  return (
    <>
      <Helmet title="Clientes" />
      <Dialog
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        title="Cadastrar Cliente"
      >
        <ClientForm<RegisterClientForm>
          mode="register"
          onSubmit={handleRegisterClient}
        />
      </Dialog>

      <div className="p-8">
        <Button variant="contained" onClick={() => setDialogVisible(true)}>
          Cadastrar
        </Button>
        <div className="mt-10 flex flex-row gap-8">
          {clients?.map((client) => <ClientCard client={client} />)}
        </div>
      </div>
    </>
  );
}
