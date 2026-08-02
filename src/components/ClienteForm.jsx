import { useEffect, useState } from "react";

const formularioInicial = {
  cedula: "",
  nombres: "",
  apellidos: "",
  correo: "",
  telefono: "",
  direccion: "",
  licencia_conducir: "",
};

function ClienteForm({
  clienteSeleccionado,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (clienteSeleccionado) {
      setFormulario({
        cedula: clienteSeleccionado.cedula || "",
        nombres: clienteSeleccionado.nombres || "",
        apellidos: clienteSeleccionado.apellidos || "",
        correo: clienteSeleccionado.correo || "",
        telefono: clienteSeleccionado.telefono || "",
        direccion: clienteSeleccionado.direccion || "",
        licencia_conducir:
          clienteSeleccionado.licencia_conducir || "",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [clienteSeleccionado]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    onGuardar(formulario);

    if (!clienteSeleccionado) {
      setFormulario(formularioInicial);
    }
  }

  function manejarCancelacion() {
    setFormulario(formularioInicial);
    onCancelar();
  }

  return (
    <form onSubmit={manejarEnvio}>
      <h3>
        {clienteSeleccionado
          ? "Editar cliente"
          : "Registrar cliente"}
      </h3>

      <label htmlFor="cedula">Cédula</label>
      <input
        id="cedula"
        type="text"
        name="cedula"
        value={formulario.cedula}
        onChange={manejarCambio}
        maxLength="10"
        required
      />

      <label htmlFor="nombres">Nombres</label>
      <input
        id="nombres"
        type="text"
        name="nombres"
        value={formulario.nombres}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="apellidos">Apellidos</label>
      <input
        id="apellidos"
        type="text"
        name="apellidos"
        value={formulario.apellidos}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="correo">Correo</label>
      <input
        id="correo"
        type="email"
        name="correo"
        value={formulario.correo}
        onChange={manejarCambio}
      />

      <label htmlFor="telefono">Teléfono</label>
      <input
        id="telefono"
        type="text"
        name="telefono"
        value={formulario.telefono}
        onChange={manejarCambio}
      />

      <label htmlFor="direccion">Dirección</label>
      <input
        id="direccion"
        type="text"
        name="direccion"
        value={formulario.direccion}
        onChange={manejarCambio}
      />

      <label htmlFor="licencia_conducir">
        Fecha de vencimiento de licencia
      </label>
      <input
        id="licencia_conducir"
        type="date"
        name="licencia_conducir"
        value={formulario.licencia_conducir}
        onChange={manejarCambio}
      />

      <button type="submit">
        {clienteSeleccionado ? "Actualizar" : "Guardar"}
      </button>

      {clienteSeleccionado && (
        <button type="button" onClick={manejarCancelacion}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ClienteForm;