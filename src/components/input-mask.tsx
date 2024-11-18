import { InputBaseComponentProps } from "@mui/material";
import React, { FormEvent } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps extends InputBaseComponentProps {
  onChange: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name: string;
  mask: string;
}

export const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, mask, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => {
          onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  },
);
