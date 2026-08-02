const API_URL = "http://127.0.0.1:5000/api/vehiculos";

export async function obtenerVehiculos() {
  const respuesta = await fetch(API_URL);
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al obtener los vehículos."
    );
  }

  return resultado.data || [];
}

export async function crearVehiculo(vehiculo) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehiculo),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al crear el vehículo."
    );
  }

  return resultado;
}

export async function actualizarVehiculo(id, vehiculo) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehiculo),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al actualizar el vehículo."
    );
  }

  return resultado;
}

export async function eliminarVehiculo(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al eliminar el vehículo."
    );
  }

  return resultado;
}