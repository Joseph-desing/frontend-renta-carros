import { Route, Routes } from "react-router-dom";

import RutaProtegida from "./components/RutaProtegida.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import ClientesPage from "./pages/ClientesPage.jsx";
import InicioPage from "./pages/InicioPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ReservasPage from "./pages/ReservasPage.jsx";
import VehiculosPage from "./pages/VehiculosPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <RutaProtegida>
            <MainLayout />
          </RutaProtegida>
        }
      >
        <Route path="/" element={<InicioPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
        <Route path="/reservas" element={<ReservasPage />} />
      </Route>
    </Routes>
  );
}

export default App;