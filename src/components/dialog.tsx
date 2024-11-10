import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, Dialog as MUIDialog } from "@mui/material";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog(props: DialogProps) {
  const { onClose, open, title, children } = props;

  return (
    <MUIDialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MUIDialog>
  );
}
