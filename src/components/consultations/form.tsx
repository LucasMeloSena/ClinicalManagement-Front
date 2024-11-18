import { z } from "zod";
import { DatePicker } from "../date-picker";
import Select from "../select";
import { TimePicker } from "../time-picker";
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
import { dirtyValues } from "../../utils/dirty-values";
import { Button } from "@mui/material";
import { InputText } from "../input-text";
import { consultationSchema } from "../../models/Schemas";

enum FormFields {
  date = "Data",
  start_at = "Hora de Início",
  end_at = "Hora de Término",
  nutritionist = "Nutricionista",
  client = "Cliente",
}

type ConsultationForm = z.infer<typeof consultationSchema>;
export type RegisterConsultationForm = Required<ConsultationForm>;
export type UpdateConsultationForm = Partial<ConsultationForm>;
const registerSchema = consultationSchema;
const updateSchema = consultationSchema.partial();

interface ConsultationFormProps<T extends FieldValues> {
  mode: "register" | "update";
  initialData?: T;
  onSubmit: SubmitHandler<T>;
  onDelete?: () => void;
  data?: {
    date?: Dayjs;
    nutritionists: SelectOption[];
    clients: SelectOption[];
  };
}

export function ConsultationForm<T extends FieldValues>({
  mode,
  initialData,
  onSubmit,
  onDelete,
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
    formState: { isSubmitting, errors, dirtyFields },
  } = hookForm;

  const onClick = (data: T) => {
    if (mode === "update") {
      const values = dirtyValues(dirtyFields, data);
      onSubmit(values as T);
      return;
    }
    onSubmit(data);
  };

  const onError = () => {
    if (errors) {
      onFieldError(FormFields, errors);
    }
  };

  return (
    <>
      <FormProvider {...hookForm}>
        <form
          className="grid grid-cols-2 items-center justify-center gap-10"
          onSubmit={handleSubmit(onClick, onError)}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <Controller
              name={"date" as Path<T>}
              defaultValue={dayjs(data?.date) as PathValue<T, Path<T>>}
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
              name={"startAt" as Path<T>}
              control={control}
              defaultValue={dayjs(data?.date) as PathValue<T, Path<T>>}
              render={({ field }) => (
                <TimePicker
                  label="Hora Início Consulta"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name={"endAt" as Path<T>}
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
              control={control}
              render={({ field }) => (
                <Select
                  label="Nutricionista"
                  options={data?.nutritionists ?? []}
                  value={field.value || { name: "", id: "" }}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name={"client" as Path<T>}
              control={control}
              render={({ field }) => (
                <Select
                  label="Cliente"
                  options={data?.clients ?? []}
                  value={field.value || { name: "", id: "" }}
                  onChange={field.onChange}
                />
              )}
            />
            {mode == "register" && (
              <Controller
                name={"intervalOfDaysToRepeat" as Path<T>}
                control={control}
                render={({ field }) => (
                  <InputText
                    value={field.value}
                    onChange={field.onChange}
                    type="number"
                    label="Repete (dias)"
                    variant={"outlined"}
                  />
                )}
              />
            )}
          </div>
          {mode == "update" && (
            <Button variant="contained" onClick={onDelete}>
              Excluir
            </Button>
          )}
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
            className={
              mode == "register"
                ? "col-span-2 w-1/2 justify-self-center"
                : undefined
            }
          >
            {mode === "register" ? "Cadastrar" : "Atualizar"}
          </LoadingButton>
        </form>
      </FormProvider>
    </>
  );
}
