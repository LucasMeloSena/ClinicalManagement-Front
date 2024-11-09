import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedTextFieldProps,
} from "@mui/material";

type InputTextProps = OutlinedTextFieldProps;

export function InputText({ value, onChange, label, type }: InputTextProps) {
  return (
    <>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          id={`outlined-${label}`}
          type={type}
          fullWidth
          label={label}
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
}
