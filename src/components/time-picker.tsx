import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  TimePicker as MUITimePicker,
  TimePickerFieldProps,
} from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

interface TimePickerProps
  extends Omit<
    TimePickerFieldProps<Dayjs>,
    "ampm" | "format" | "timezone" | "disablePast" | "disableFuture"
  > {}

export function TimePicker({ label, value, onChange }: TimePickerProps) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <MUITimePicker
            label={label}
            ampm={false}
            value={value}
            onChange={onChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}