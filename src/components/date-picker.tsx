import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePickerFieldProps,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

type DatePickerProps = Omit<
  DatePickerFieldProps<Dayjs>,
  | "format"
  | "timezone"
  | "maxDate"
  | "minDate"
  | "disablePast"
  | "disableFuture"
>;

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  return (
    <>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DemoContainer components={["DatePicker"]}>
            <MUIDatePicker
              label={label}
              value={value}
              onChange={onChange}
              className="w-full"
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
    </>
  );
}
