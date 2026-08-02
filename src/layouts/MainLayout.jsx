import { Link, Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  function cerrarSesion() {
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <div>
      <header>
        <h1>Sistema de renta de carros</h1>

        <p>
          Bienvenido, {usuario?.nombre || "Usuario"}
        </p>

        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/vehiculos">Vehículos</Link>
          <Link to="/reservas">Reservas</Link>

          <button type="button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;