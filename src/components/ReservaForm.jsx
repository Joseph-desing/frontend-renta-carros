import { useEffect, useState } from "react";

const formularioInicial = {
  cliente_id: "",
  vehiculo_id: "",
  fecha_inicio: "",
  fecha_fin: "",
  estado: "PENDIENTE",
};

function ReservaForm({
  reservaSeleccionada,
  clientes,
  vehiculos,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (reservaSeleccionada) {
      setFormulario({
        cliente_id:
          reservaSeleccionada.cliente_id?.toString() || "",
        vehiculo_id:
          reservaSeleccionada.vehiculo_id?.toString() || "",
        fecha_inicio: reservaSeleccionada.fecha_inicio || "",
        fecha_fin: reservaSeleccionada.fecha_fin || "",
        estado: reservaSeleccionada.estado || "PENDIENTE",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [reservaSeleccionada]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    onGuardar({
      ...formulario,
      cliente_id: Number(formulario.cliente_id),
      vehiculo_id: Number(formulario.vehiculo_id),
    });

    if (!reservaSeleccionada) {
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
        {reservaSeleccionada
          ? "Editar reserva"
          : "Registrar reserva"}
      </h3>

      <label htmlFor="cliente_id">Cliente</label>
      <select
        id="cliente_id"
        name="cliente_id"
        value={formulario.cliente_id}
        onChange={manejarCambio}
        required
      >
        <option value="">Seleccione un cliente</option>

        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.cedula} - {cliente.nombres}{" "}
            {cliente.apellidos}
          </option>
        ))}
      </select>

      <label htmlFor="vehiculo_id">Vehículo</label>
      <select
        id="vehiculo_id"
        name="vehiculo_id"
        value={formulario.vehiculo_id}
        onChange={manejarCambio}
        required
      >
        <option value="">Seleccione un vehículo</option>

        {vehiculos
  .filter(
    (vehiculo) =>
      vehiculo.estado === "Disponible" ||
      vehiculo.id === reservaSeleccionada?.vehiculo_id
  )
  .map((vehiculo) => (
    <option key={vehiculo.id} value={vehiculo.id}>
      {vehiculo.placa} - {vehiculo.marca}{" "}
      {vehiculo.modelo} - {vehiculo.estado}
    </option>
  ))}
      </select>

      <label htmlFor="fecha_inicio">Fecha de inicio</label>
      <input
        id="fecha_inicio"
        type="date"
        name="fecha_inicio"
        value={formulario.fecha_inicio}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="fecha_fin">Fecha de fin</label>
      <input
        id="fecha_fin"
        type="date"
        name="fecha_fin"
        value={formulario.fecha_fin}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="estado">Estado</label>
      <select
        id="estado"
        name="estado"
        value={formulario.estado}
        onChange={manejarCambio}
        required
      >
        <option value="PENDIENTE">PENDIENTE</option>
        <option value="CONFIRMADA">CONFIRMADA</option>
        <option value="FINALIZADA">FINALIZADA</option>
        <option value="CANCELADA">CANCELADA</option>
      </select>

      <button type="submit">
        {reservaSeleccionada ? "Actualizar" : "Guardar"}
      </button>

      {reservaSeleccionada && (
        <button type="button" onClick={manejarCancelacion}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ReservaForm;