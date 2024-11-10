import { Dialog } from "../../components/dialog";
import { useMemo, useState } from "react";
import {
  ConsultationForm,
  RegisterConsultationForm,
} from "../../components/consultations/form";
import { Helmet } from "react-helmet-async";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../contexts/auth";
import { useConsultationQueries } from "../../hooks/useConsultationQueries";
import { toast } from "sonner";
import { Calendar } from "../../components/calendar";
import { DateClickArg } from "@fullcalendar/interaction/index.js";

export function Consultations() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [date, setDate] = useState<Dayjs>(dayjs(new Date()));

  const { nutritionist } = useAuth();
  const { createConsultation, consultations } = useConsultationQueries();

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

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = dayjs(arg.dateStr);
    setDate(clickedDate);
    setDialogVisible(true);
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
      clientId: data.client.id,
      nutritionistId: data.nutritionist.id,
    });
    setDialogVisible(false);
  };

  return (
    <>
      <Helmet title="Home" />
      <Dialog
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
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
          }}
        />
      </Dialog>

      <div className="h-full w-full p-8">
        <Calendar events={events} onClick={handleDateClick} />
      </div>
    </>
  );
}
