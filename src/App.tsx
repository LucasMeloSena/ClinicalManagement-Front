import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./routes";

export default function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | ClinicaHelp" />
      <Toaster richColors position="bottom-center" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
