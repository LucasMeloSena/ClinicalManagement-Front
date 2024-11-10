import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePickerFieldProps,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

interface DatePickerProps
  extends Omit<
    DatePickerFieldProps<Dayjs>,
    | "format"
    | "timezone"
    | "maxDate"
    | "minDate"
    | "disablePast"
    | "disableFuture"
  > {}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DemoContainer components={["DatePicker"]}>
          <MUIDatePicker label={label} value={value} onChange={onChange} />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
