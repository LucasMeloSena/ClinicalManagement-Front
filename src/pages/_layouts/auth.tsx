import { Outlet } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="border-foreground/5 bg-muted text-muted-foreground flex h-full flex-col justify-between border-r p-10">
        <div className="text-foreground flex items-center gap-1 text-lg font-medium">
          <LocalHospitalIcon />
          <span className="font-semibold">ClinicalHelp</span>
        </div>

        <footer className="text-sm">
          &copy; ClinicalHelp - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
