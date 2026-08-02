import { useEffect, useState } from "react";

const formularioInicial = {
  placa: "",
  marca: "",
  modelo: "",
  anio: "",
  color: "",
  precio_dia: "",
  estado: "Disponible",
};

function VehiculoForm({
  vehiculoSeleccionado,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (vehiculoSeleccionado) {
      setFormulario({
        placa: vehiculoSeleccionado.placa || "",
        marca: vehiculoSeleccionado.marca || "",
        modelo: vehiculoSeleccionado.modelo || "",
        anio: vehiculoSeleccionado.anio || "",
        color: vehiculoSeleccionado.color || "",
        precio_dia: vehiculoSeleccionado.precio_dia || "",
        estado: vehiculoSeleccionado.estado || "Disponible",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [vehiculoSeleccionado]);

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
      anio: Number(formulario.anio),
      precio_dia: Number(formulario.precio_dia),
    });

    if (!vehiculoSeleccionado) {
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
        {vehiculoSeleccionado
          ? "Editar vehículo"
          : "Registrar vehículo"}
      </h3>

      <label htmlFor="placa">Placa</label>
      <input
        id="placa"
        name="placa"
        type="text"
        value={formulario.placa}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="marca">Marca</label>
      <input
        id="marca"
        name="marca"
        type="text"
        value={formulario.marca}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="modelo">Modelo</label>
      <input
        id="modelo"
        name="modelo"
        type="text"
        value={formulario.modelo}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="anio">Año</label>
      <input
        id="anio"
        name="anio"
        type="number"
        min="1900"
        value={formulario.anio}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="color">Color</label>
      <input
        id="color"
        name="color"
        type="text"
        value={formulario.color}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="precio_dia">Precio por día</label>
      <input
        id="precio_dia"
        name="precio_dia"
        type="number"
        min="0.01"
        step="0.01"
        value={formulario.precio_dia}
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
        <option value="Disponible">Disponible</option>
        <option value="Rentado">Rentado</option>
        <option value="Mantenimiento">Mantenimiento</option>
      </select>

      <button type="submit">
        {vehiculoSeleccionado ? "Actualizar" : "Guardar"}
      </button>

      {vehiculoSeleccionado && (
        <button type="button" onClick={manejarCancelacion}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default VehiculoForm;