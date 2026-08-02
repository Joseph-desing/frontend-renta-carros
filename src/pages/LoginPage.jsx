import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { iniciarSesion } from "../services/authService.js";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    correo: "",
    contrasena: "",
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();

    try {
      setCargando(true);
      setError("");

      const resultado = await iniciarSesion(formulario);

      localStorage.setItem(
        "usuario",
        JSON.stringify(resultado.data)
      );

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={manejarEnvio}>
        <div className="login-logo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 14.5V12l2.2-5.1A2 2 0 0 1 7 5.7h10a2 2 0 0 1 1.8 1.2L21 12v2.5"/><path d="M5 14h14a2 2 0 0 1 2 2v1H3v-1a2 2 0 0 1 2-2Z"/><path d="M5 17v2M19 17v2M7 11h10"/></svg></div>
        <h1>Iniciar sesión</h1>

        <p className="login-subtitle">Accede al panel de administración de renta de vehículos.</p>
        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          name="contrasena"
          type="password"
          value={formulario.contrasena}
          onChange={manejarCambio}
          required
        />

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
