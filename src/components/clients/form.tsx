import { z } from "zod";
import {
  Controller,
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onFieldError } from "../../utils/on-field-error";
import { Dayjs } from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { BodyBiotype, bodyBiotypeOptions } from "../../models/Client";
import { InputText } from "../input-text";
import { DatePicker } from "../date-picker";
import Select from "../select";
import { TextMaskCustom } from "../input-mask";

enum FormFields {
  name = "nome",
  email = "email",
  phone = "celular",
  birthDate = "data de nascimento",
  cpf = "cpf",
  bodyBiotype = "biotipo corporal",
}

const bodyBiotypeSchema = z.object({
  id: z.string(),
  name: z.nativeEnum(BodyBiotype),
});
export const clientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().length(15),
  birthDate: z.custom<Dayjs>(),
  cpf: z.string().length(14),
  bodyBiotype: bodyBiotypeSchema,
});
type ClientForm = z.infer<typeof clientSchema>;
export type RegisterClientForm = Required<ClientForm>;
export type UpdateClientForm = Partial<ClientForm>;
const registerSchema = clientSchema;
const updateSchema = clientSchema.partial();

interface ClientFormProps<T extends FieldValues> {
  mode: "register" | "update";
  initialData?: T;
  onSubmit: SubmitHandler<T>;
}

export function ClientForm<T extends FieldValues>({
  mode,
  initialData,
  onSubmit,
}: ClientFormProps<T>) {
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

  return (
    <>
      <FormProvider {...hookForm}>
        <form
          className="grid grid-cols-2 items-center justify-center gap-10"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <Controller
              name={"name" as Path<T>}
              control={control}
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  label="Nome"
                  variant={"outlined"}
                />
              )}
            />
            <Controller
              name={"email" as Path<T>}
              control={control}
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChange={field.onChange}
                  type="email"
                  label="E-mail"
                  variant={"outlined"}
                />
              )}
            />
            <Controller
              name={"phone" as Path<T>}
              control={control}
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChange={field.onChange}
                  name="textmask"
                  mask="(00) 90000-0000"
                  label="Celular"
                  inputComponent={TextMaskCustom}
                  variant="outlined"
                />
              )}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <Controller
              name={"cpf" as Path<T>}
              control={control}
              render={({ field }) => (
                <InputText
                  value={field.value}
                  onChange={field.onChange}
                  name="textmask"
                  mask="000.000.000-00"
                  label="CPF"
                  inputComponent={TextMaskCustom}
                  variant="outlined"
                />
              )}
            />
            <Controller
              name={"birthDate" as Path<T>}
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data Nascimento"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name={"bodyBiotype" as Path<T>}
              control={control}
              render={({ field }) => (
                <Select
                  label="Biotipo Corporal"
                  options={bodyBiotypeOptions}
                  value={field.value || { name: "", id: "" }}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
            className="col-span-2 w-1/2 justify-self-center"
          >
            {mode === "register" ? "Cadastrar" : "Atualizar"}
          </LoadingButton>
        </form>
      </FormProvider>
    </>
  );
}
