const API_URL = "http://127.0.0.1:5000/api/reservas";

export async function obtenerReservas() {
  const respuesta = await fetch(API_URL);
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al obtener las reservas."
    );
  }

  return resultado.data || [];
}

export async function crearReserva(reserva) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reserva),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al crear la reserva."
    );
  }

  return resultado;
}

export async function actualizarReserva(id, reserva) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reserva),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al actualizar la reserva."
    );
  }

  return resultado;
}

export async function eliminarReserva(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al eliminar la reserva."
    );
  }

  return resultado;
}