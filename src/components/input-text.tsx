import {
  FormControl,
  InputBaseComponentProps,
  InputLabel,
  OutlinedInput,
  OutlinedTextFieldProps,
} from "@mui/material";
import React from "react";

interface InputTextProps extends OutlinedTextFieldProps {
  inputComponent?: React.ElementType<InputBaseComponentProps>;
  mask?: string;
}

export function InputText({
  value,
  onChange,
  label,
  type,
  inputComponent,
  mask,
}: InputTextProps) {
  return (
    <>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          id={`outlined-input`}
          type={type}
          fullWidth
          label={label}
          value={value}
          onChange={onChange}
          inputComponent={inputComponent}
          inputProps={{ mask }}
        />
      </FormControl>
    </>
  );
}
