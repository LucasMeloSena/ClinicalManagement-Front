import { z } from "zod";
import { DatePicker } from "../date-picker";
import Select from "../select";
import { TimePicker } from "../time-picker";
import { commonSchema } from "../../utils/common-zod-schema";
import {
  Controller,
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  PathValue,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onFieldError } from "../../utils/on-field-error";
import dayjs, { Dayjs } from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";

enum FormFields {
  date = "Data",
  start_at = "Hora de Início",
  end_at = "Hora de Término",
  nutritionist = "Nutricionista",
  client = "Cliente",
}

const consultationSchema = z.object({
  date: z.custom<Dayjs>(),
  start_at: z.custom<Dayjs>(),
  end_at: z.custom<Dayjs>(),
  client: commonSchema,
  nutritionist: commonSchema,
});
type ConsultationForm = z.infer<typeof consultationSchema>;
export type RegisterConsultationForm = Required<ConsultationForm>;
export type UpdateConsultationForm = Partial<ConsultationForm>;
const registerSchema = consultationSchema;
const updateSchema = consultationSchema.partial();

interface ConsultationFormProps<T extends FieldValues> {
  mode: "register" | "update";
  initialData?: T;
  onSubmit: SubmitHandler<T>;
  data: {
    date: Dayjs;
    nutritionist: SelectOption;
  };
}

export function ConsultationForm<T extends FieldValues>({
  mode,
  initialData,
  onSubmit,
  data,
}: ConsultationFormProps<T>) {
  const hookForm = useForm<T>({
    resolver: zodResolver(mode === "update" ? updateSchema : registerSchema),
    defaultValues: initialData as DefaultValues<T>,
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = hookForm;

  const onError = () => {
    if (errors) {
      onFieldError(FormFields, errors);
    }
  };

  const characters = [
    { id: "67311a636e0d070785576e53", name: "Lucas Sena" },
    { id: "673119b56e0d070785576e4f", name: "John Doe" },
  ];

  return (
    <>
      <FormProvider {...hookForm}>
        <form
          className="grid grid-cols-2 items-center justify-center gap-10"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <Controller
              name={"date" as Path<T>}
              defaultValue={dayjs(data.date) as PathValue<T, Path<T>>}
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data Consulta"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name={"start_at" as Path<T>}
              control={control}
              defaultValue={dayjs(data.date) as PathValue<T, Path<T>>}
              render={({ field }) => (
                <TimePicker
                  label="Hora Início Consulta"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name={"end_at" as Path<T>}
              control={control}
              render={({ field }) => (
                <TimePicker
                  label="Hora Término Consulta"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <Controller
              name={"nutritionist" as Path<T>}
              defaultValue={data.nutritionist as PathValue<T, Path<T>>}
              control={control}
              render={({ field }) => (
                <Select
                  label="Nutricionista"
                  options={characters}
                  value={field.value || { name: "", id: "" }}
                  onChange={field.onChange}
                  disabled
                />
              )}
            />
            <Controller
              name={"client" as Path<T>}
              control={control}
              render={({ field }) => (
                <Select
                  label="Cliente"
                  options={characters}
                  value={field.value || { name: "", id: "" }}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            className="col-span-2 w-1/2 justify-self-center"
            type="submit"
          >
            Cadastrar
          </LoadingButton>
        </form>
      </FormProvider>
    </>
  );
}
