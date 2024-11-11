import { Dialog } from "../../components/dialog";
import { useMemo, useState } from "react";
import {
  ConsultationForm,
  RegisterConsultationForm,
  UpdateConsultationForm,
} from "../../components/consultations/form";
import { Helmet } from "react-helmet-async";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../contexts/auth";
import { useConsultationQueries } from "../../hooks/useConsultationQueries";
import { toast } from "sonner";
import { Calendar } from "../../components/calendar";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { useClientsQueries } from "../../hooks/useClientsQueries";
import { useQueryClient } from "@tanstack/react-query";
import { QueriesKeys } from "../../utils/enums/queries-keys";
import { Consultation } from "../../models/Consultation";

export function Consultations() {
  const [registerDialogVisible, setRegisterDialogVisible] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [date, setDate] = useState<Dayjs>(dayjs(new Date()));
  const [id, setId] = useState<string>()
  const [initialData, setInitialData] = useState<Consultation>()

  const { nutritionist } = useAuth();
  const { createConsultation, consultations, consultation } = useConsultationQueries({id, nutritionist: nutritionist?._id ?? ""});
  const { clients } = useClientsQueries();
  const queryClient = useQueryClient()

  const events = useMemo(() => {
    if (consultations) {
      return consultations.map((consultation) => ({
        id: consultation._id,
        start: consultation.startAt,
        end: consultation.endAt,
        overlap: true,
      }));
    }
    return [];
  }, [consultations]);

  const clientsOptions = useMemo(() => {
    if (clients) {
      return clients.map((client) => ({
        id: client._id,
        name: client.name,
      }));
    }
    return [];
  }, [clients]);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = dayjs(arg.dateStr);
    setDate(clickedDate);
    setRegisterDialogVisible(true);
  };

  const handleSubmitConsultation = async (data: RegisterConsultationForm) => {
    if (data.end_at.isBefore(data.start_at)) {
      return toast.warning(
        "O campo Hora de Término está anterior a Hora de Início",
      );
    }

    const date = data.date.toDate();
    const startTime = data.start_at.toDate();
    const endTime = data.end_at.toDate();
    const startAt = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      startTime.getHours(),
      startTime.getMinutes(),
    );
    const endAt = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      endTime.getHours(),
      endTime.getMinutes(),
    );

    await createConsultation.mutateAsync({
      startAt,
      endAt,
      client: data.client.id,
      nutritionist: data.nutritionist.id,
    });
    setRegisterDialogVisible(false);
  };

  const handleUpdateConsultation = async (data: UpdateConsultationForm) => {
    console.log(data)
  }

  const handleClickInConsultation = (id: string) => {
    setId(id)
    queryClient.invalidateQueries({queryKey: [QueriesKeys.FindConsultationById, id]})
    setInitialData(consultation)
    setUpdateDialogVisible(true)
  }



  return (
    <>
      <Helmet title="Home" />
      
      <Dialog
        open={registerDialogVisible}
        onClose={() => setRegisterDialogVisible(false)}
        title="Cadastrar Consulta"
      >
        <ConsultationForm<RegisterConsultationForm>
          onSubmit={handleSubmitConsultation}
          mode="register"
          data={{
            date,
            nutritionist: {
              id: nutritionist?._id ?? "",
              name: nutritionist?.name ?? "",
            },
            clients: clientsOptions,
          }}
        />
      </Dialog>

      <Dialog
        open={updateDialogVisible}
        onClose={() => setUpdateDialogVisible(false)}
        title="Atualizar Consulta"
      >
        <ConsultationForm<UpdateConsultationForm>
          onSubmit={handleUpdateConsultation}
          mode="register"
          initialData={initialData}
        />
      </Dialog>

      <div className="h-full w-full p-8">
        <Calendar events={events} onClick={handleDateClick} onClickConsultation={handleClickInConsultation}/>
      </div>
    </>
  );
}
