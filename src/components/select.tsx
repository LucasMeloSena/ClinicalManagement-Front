import { FormControl, InputLabel, MenuItem } from "@mui/material";
import {
  SelectProps as MUISelectProps,
  SelectChangeEvent,
} from "@mui/material/Select";
import { Select as MUISelect } from "@mui/material";

interface SelectProps extends Omit<MUISelectProps, "value" | "onChange"> {
  value: SelectOption;
  onChange: (value: SelectOption) => void;
  options: {
    id: string;
    name: string;
  }[];
}

export default function Select({
  options,
  value,
  onChange,
  id,
  label,
  disabled,
}: SelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedItem = options.find((option) => option.id === selectedId);
    if (selectedItem) {
      onChange(selectedItem);
    }
  };

  return (
    <FormControl className="w-full">
      <InputLabel>{label}</InputLabel>
      <MUISelect
        id={id}
        value={value.id}
        label={label}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
}
