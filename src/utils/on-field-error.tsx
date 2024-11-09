import { FieldErrors, FieldValues } from "react-hook-form";
import { toast } from "sonner";

export function onFieldError<T extends FieldValues>(
  fieldsEnum: Record<string, string>,
  errors: FieldErrors<T>,
): void {
  if (errors) {
    const firstErrorKey = Object.keys(errors)[0] as keyof typeof fieldsEnum;
    const fieldName = fieldsEnum[firstErrorKey] || firstErrorKey;
    const displayErrorMessage = `Campo ${fieldName ?? ""} inválido. Por favor, verifique os dados inseridos`;
    toast.warning(displayErrorMessage);
  }
}
