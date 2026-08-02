import { useEffect, useState } from "react";

import ClienteForm from "../components/ClienteForm.jsx";
import ClienteTable from "../components/ClienteTable.jsx";

import {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  obtenerClientes,
} from "../services/clienteService.js";

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarClientes() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerClientes();
      setClientes(datos || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  async function guardarCliente(formulario) {
    try {
      setMensaje("");
      setError("");

      if (clienteSeleccionado) {
        const resultado = await actualizarCliente(
          clienteSeleccionado.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Cliente actualizado correctamente."
        );
      } else {
        const resultado = await crearCliente(formulario);

        setMensaje(
          resultado.message ||
            "Cliente creado correctamente."
        );
      }

      setClienteSeleccionado(null);
      await cargarClientes();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarCliente(cliente) {
    setMensaje("");
    setError("");
    setClienteSeleccionado(cliente);
  }

  function cancelarEdicion() {
    setClienteSeleccionado(null);
  }

  async function borrarCliente(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este cliente?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarCliente(id);

      setMensaje(
        resultado.message ||
          "Cliente eliminado correctamente."
      );

      if (clienteSeleccionado?.id === id) {
        setClienteSeleccionado(null);
      }

      await cargarClientes();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h2>Clientes</h2>

      <ClienteForm
        clienteSeleccionado={clienteSeleccionado}
        onGuardar={guardarCliente}
        onCancelar={cancelarEdicion}
      />

      {mensaje && (
        <p className="mensaje-exito">{mensaje}</p>
      )}

      {error && (
        <p className="mensaje-error">{error}</p>
      )}

      {cargando ? (
        <p>Cargando clientes...</p>
      ) : (
        <ClienteTable
          clientes={clientes}
          onEditar={editarCliente}
          onEliminar={borrarCliente}
        />
      )}
    </section>
  );
}

export default ClientesPage;