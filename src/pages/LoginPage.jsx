import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { iniciarSesion } from "../services/authService.js";

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
        <h1>Iniciar sesión</h1>

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