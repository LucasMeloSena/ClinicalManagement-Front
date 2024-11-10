import { Helmet } from "react-helmet-async";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { InputPassword } from "../../components/input-pass";
import { InputText } from "../../components/input-text";
import { onFieldError } from "../../utils/on-field-error";
import { useSignInQuery } from "../../hooks/useSignInQuery";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

enum FormFields {
  email = "email",
  password = "senha",
}

const loginSchema = z.object({
  email: z.string().email({ message: "O e-mail fornecido é inválido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve conter no mínimo 6 caracteres." }),
});
type LoginForm = z.infer<typeof loginSchema>;

export function SignIn() {
  const [params, _] = useSearchParams();

  useEffect(() => {
    const session = params.get("session");
    if (session === "inactive") {
      toast.warning("Sua sessão expirou. Faça login novamente!");
    }
  }, []);

  const hookForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = hookForm;

  const { loginNutritionist } = useSignInQuery();
  const handleSignIn = async (data: LoginForm) => {
    await loginNutritionist.mutateAsync(data);
  };

  const handleFormError = () => {
    if (errors) {
      onFieldError(FormFields, errors);
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="w-96 p-8">
        <div className="flex w-full flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar App
            </h1>
            <p className="text-muted-foreground text-sm">
              Gerencie suas consultas de uma maneira mais ágil!
            </p>
          </div>
          <FormProvider {...hookForm}>
            <form
              className="flex flex-col items-center space-y-4"
              onSubmit={handleSubmit(handleSignIn, handleFormError)}
            >
              <div className="w-full space-y-2">
                <Controller
                  name={"email"}
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
              </div>
              <div className="w-full space-y-2">
                <Controller
                  name={"password"}
                  control={control}
                  render={({ field }) => (
                    <InputPassword
                      value={field.value}
                      onChange={field.onChange}
                      variant={"outlined"}
                    />
                  )}
                />
              </div>
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                className="w-1/2"
                type="submit"
              >
                Login
              </LoadingButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
