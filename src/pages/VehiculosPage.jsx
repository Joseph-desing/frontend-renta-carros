import { useEffect, useState } from "react";

import VehiculoForm from "../components/VehiculoForm.jsx";
import VehiculoTable from "../components/VehiculoTable.jsx";

import {
  actualizarVehiculo,
  crearVehiculo,
  eliminarVehiculo,
  obtenerVehiculos,
} from "../services/vehiculoService.js";

function VehiculosPage() {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarVehiculos() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerVehiculos();
      setVehiculos(datos || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarVehiculos();
  }, []);

  async function guardarVehiculo(formulario) {
    try {
      setMensaje("");
      setError("");

      if (vehiculoSeleccionado) {
        const resultado = await actualizarVehiculo(
          vehiculoSeleccionado.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Vehículo actualizado correctamente."
        );
      } else {
        const resultado = await crearVehiculo(formulario);

        setMensaje(
          resultado.message ||
            "Vehículo creado correctamente."
        );
      }

      setVehiculoSeleccionado(null);
      await cargarVehiculos();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarVehiculo(vehiculo) {
    setMensaje("");
    setError("");
    setVehiculoSeleccionado(vehiculo);
  }

  function cancelarEdicion() {
    setVehiculoSeleccionado(null);
  }

  async function borrarVehiculo(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este vehículo?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarVehiculo(id);

      setMensaje(
        resultado.message ||
          "Vehículo eliminado correctamente."
      );

      if (vehiculoSeleccionado?.id === id) {
        setVehiculoSeleccionado(null);
      }

      await cargarVehiculos();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="page-section">
      <h2>Vehículos</h2>

      <VehiculoForm
        vehiculoSeleccionado={vehiculoSeleccionado}
        onGuardar={guardarVehiculo}
        onCancelar={cancelarEdicion}
      />

      {mensaje && (
        <p className="mensaje-exito">{mensaje}</p>
      )}

      {error && (
        <p className="mensaje-error">{error}</p>
      )}

      {cargando ? (
        <p>Cargando vehículos...</p>
      ) : (
        <VehiculoTable
          vehiculos={vehiculos}
          onEditar={editarVehiculo}
          onEliminar={borrarVehiculo}
        />
      )}
    </section>
  );
}

export default VehiculosPage;
