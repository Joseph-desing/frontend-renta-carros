import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";

function MainLayout() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function cerrarSesion() {
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-row">
            <div className="brand-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 14.5V12l2.2-5.1A2 2 0 0 1 7 5.7h10a2 2 0 0 1 1.8 1.2L21 12v2.5"/><path d="M5 14h14a2 2 0 0 1 2 2v1H3v-1a2 2 0 0 1 2-2Z"/><path d="M5 17v2M19 17v2M7 11h10"/></svg></div>
            <div className="brand-copy"><h1>Sistema de Renta de Carros</h1><p>Bienvenido, {usuario?.nombre || "Administrador Principal"}</p></div>
          </div>
          <nav className="main-nav" aria-label="Navegación principal">
            <NavLink className="nav-link" to="/">Inicio</NavLink>
            <NavLink className="nav-link" to="/clientes">Clientes</NavLink>
            <NavLink className="nav-link" to="/vehiculos">Vehículos</NavLink>
            <NavLink className="nav-link" to="/reservas">Reservas</NavLink>
            <button className="logout-button" type="button" onClick={cerrarSesion}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></svg><span>Cerrar sesión</span></button>
          </nav>
        </div>
      </header>
      <main className="app-main"><Outlet /></main>
    </div>
  );
}
export default MainLayout;
