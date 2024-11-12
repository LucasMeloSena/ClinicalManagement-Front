import { Dialog } from "../../components/dialog";
import { useEffect, useMemo, useState } from "react";
import {
  ConsultationForm,
  RegisterConsultationForm,
  UpdateConsultationForm,
} from "../../components/consultations/form";
import { Helmet } from "react-helmet-async";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../contexts/auth";
import { useConsultationQueries } from "../../hooks/useConsultationQueries";
import { Calendar } from "../../components/calendar";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { useClientsQueries } from "../../hooks/useClientsQueries";
import { useQueryClient } from "@tanstack/react-query";
import { QueriesKeys } from "../../utils/enums/queries-keys";
import { generateDate } from "../../utils/generate-date";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNutritionistQueries } from "../../hooks/useNutritionistsQueries";

export function Consultations() {
  const [registerDialogVisible, setRegisterDialogVisible] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const [date, setDate] = useState<Dayjs>(dayjs(new Date()));
  const [id, setId] = useState<string>();
  const [initialData, setInitialData] = useState<UpdateConsultationForm>();

  const { nutritionist } = useAuth();
  const {
    createConsultation,
    updateConsultation,
    deleteConsultation,
    consultations,
    consultation,
  } = useConsultationQueries({ id, nutritionist: nutritionist?._id ?? "" });
  const { clients } = useClientsQueries();
  const { nutritionists } = useNutritionistQueries();
  const queryClient = useQueryClient();

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

  const nutritionistsOptions = useMemo(() => {
    if (nutritionists) {
      return nutritionists.map((nutritionist) => ({
        id: nutritionist._id,
        name: nutritionist.name,
      }));
    }
    return [];
  }, [nutritionists]);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = dayjs(arg.dateStr);
    setDate(clickedDate);
    setRegisterDialogVisible(true);
  };

  const handleSubmitConsultation = async (data: RegisterConsultationForm) => {
    const { startAt, endAt } = generateDate(
      data.date.toDate(),
      data.startAt,
      data.endAt,
    );

    await createConsultation.mutateAsync({
      startAt,
      endAt,
      client: data.client.id,
      nutritionist: data.nutritionist.id,
      intervalOfDaysToRepeat: data.intervalOfDaysToRepeat,
    });
    setRegisterDialogVisible(false);
  };

  const handleUpdateConsultation = async (data: UpdateConsultationForm) => {
    if (data.date) {
      const { startAt, endAt } = generateDate(
        data.date.toDate(),
        dayjs(consultation?.startAt),
        dayjs(consultation?.endAt),
      );
      await updateConsultation.mutateAsync({
        id: id!,
        startAt: startAt,
        endAt: endAt,
        client: data?.client?.id,
        nutritionist: data?.nutritionist?.id,
      });
    }
    await updateConsultation.mutateAsync({
      id: id!,
      startAt: data?.startAt?.toDate(),
      endAt: data?.endAt?.toDate(),
      client: data?.client?.id,
      nutritionist: data?.nutritionist?.id,
    });

    setUpdateDialogVisible(false);
  };

  const handleDeleteConsultation = async () => {
    await deleteConsultation.mutateAsync(id ?? "");
    setDeleteDialogVisible(false);
    setUpdateDialogVisible(false);
  };

  const handleClickInConsultation = (id: string) => {
    setId(id);
    queryClient.invalidateQueries({
      queryKey: [QueriesKeys.FindConsultationById, id],
    });
  };

  const formData = useMemo(() => {
    return {
      ...(consultation ?? {}),
      _id: id ?? "",
      client: {
        id: consultation?.client._id ?? "",
        name: consultation?.client.name ?? "",
      },
      nutritionist: {
        id: consultation?.nutritionist._id ?? "",
        name: consultation?.nutritionist.name ?? "",
      },
      date: dayjs(consultation?.startAt),
      startAt: dayjs(consultation?.startAt),
      endAt: dayjs(consultation?.endAt),
    };
  }, [consultation]);

  useEffect(() => {
    if (id && consultation) {
      setInitialData(formData);
      setUpdateDialogVisible(true);
    }
  }, [formData, id, consultation]);

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
            nutritionists: nutritionistsOptions,
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
          onDelete={() => setDeleteDialogVisible(true)}
          mode="update"
          initialData={initialData}
          data={{
            clients: clientsOptions,
            nutritionists: nutritionistsOptions,
          }}
        />
      </Dialog>

      <Dialog
        open={deleteDialogVisible}
        onClose={() => setDeleteDialogVisible(false)}
        title="Excluir Consulta"
      >
        <div className="flex flex-col gap-4">
          <h2>Você tem certeza que deseja excluir esta consulta?</h2>
          <LoadingButton variant="contained" onClick={handleDeleteConsultation}>
            Confirmar
          </LoadingButton>
        </div>
      </Dialog>

      <div className="h-full w-full p-8">
        <Calendar
          events={events}
          onClick={handleDateClick}
          onClickConsultation={handleClickInConsultation}
        />
      </div>
    </>
  );
}
