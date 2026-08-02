import { useEffect, useState } from "react";

import ReservaForm from "../components/ReservaForm.jsx";
import ReservaTable from "../components/ReservaTable.jsx";

import { obtenerClientes } from "../services/clienteService.js";
import { obtenerVehiculos } from "../services/vehiculoService.js";

import {
  actualizarReserva,
  crearReserva,
  eliminarReserva,
  obtenerReservas,
} from "../services/reservaService.js";

function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [reservaSeleccionada, setReservaSeleccionada] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarDatos() {
    try {
      setCargando(true);
      setError("");

      const [
        datosReservas,
        datosClientes,
        datosVehiculos,
      ] = await Promise.all([
        obtenerReservas(),
        obtenerClientes(),
        obtenerVehiculos(),
      ]);

      setReservas(datosReservas || []);
      setClientes(datosClientes || []);
      setVehiculos(datosVehiculos || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function guardarReserva(formulario) {
    try {
      setMensaje("");
      setError("");

      if (reservaSeleccionada) {
        const resultado = await actualizarReserva(
          reservaSeleccionada.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Reserva actualizada correctamente."
        );
      } else {
        const resultado = await crearReserva(formulario);

        setMensaje(
          resultado.message ||
            "Reserva creada correctamente."
        );
      }

      setReservaSeleccionada(null);
      await cargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarReserva(reserva) {
    setMensaje("");
    setError("");
    setReservaSeleccionada(reserva);
  }

  function cancelarEdicion() {
    setReservaSeleccionada(null);
  }

  async function borrarReserva(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar esta reserva?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarReserva(id);

      setMensaje(
        resultado.message ||
          "Reserva eliminada correctamente."
      );

      if (reservaSeleccionada?.id === id) {
        setReservaSeleccionada(null);
      }

      await cargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h2>Reservas</h2>

      <ReservaForm
        reservaSeleccionada={reservaSeleccionada}
        clientes={clientes}
        vehiculos={vehiculos}
        onGuardar={guardarReserva}
        onCancelar={cancelarEdicion}
      />

      {mensaje && (
        <p className="mensaje-exito">{mensaje}</p>
      )}

      {error && (
        <p className="mensaje-error">{error}</p>
      )}

      {cargando ? (
        <p>Cargando reservas...</p>
      ) : (
        <ReservaTable
          reservas={reservas}
          onEditar={editarReserva}
          onEliminar={borrarReserva}
        />
      )}
    </section>
  );
}

export default ReservasPage;