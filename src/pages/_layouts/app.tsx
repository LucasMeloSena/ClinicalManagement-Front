import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export function AppLayout() {
  const { signOut } = useAuth()
  
  const handleLogoutClick = () => {
    signOut()
  }

  return (
    <div>
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-gray-800">
            <span>ClinicalHelp</span>
          </div>

          <nav className="space-x-6">
            <a
              href="/consultations"
              className="text-gray-600 transition duration-200 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="/clients"
              className="text-gray-600 transition duration-200 hover:text-blue-600"
            >
              Clientes
            </a>
          </nav>
        </div>
        <Button variant="contained" onClick={handleLogoutClick}>Logout</Button>
      </header>
      <Outlet />
    </div>
  );
}
