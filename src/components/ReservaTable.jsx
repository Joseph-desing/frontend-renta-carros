function ReservaTable({
  reservas,
  onEditar,
  onEliminar,
}) {
  if (reservas.length === 0) {
    return <p>No existen reservas registradas.</p>;
  }

  return (
    <div>
      <h3>Lista de reservas</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Vehículo</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Precio total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>

              <td>
                {reserva.cliente
                  ? `${reserva.cliente.nombres} ${reserva.cliente.apellidos}`
                  : `Cliente ID ${reserva.cliente_id}`}
              </td>

              <td>
                {reserva.vehiculo
                  ? `${reserva.vehiculo.placa} - ${reserva.vehiculo.marca} ${reserva.vehiculo.modelo}`
                  : `Vehículo ID ${reserva.vehiculo_id}`}
              </td>

              <td>{reserva.fecha_inicio}</td>
              <td>{reserva.fecha_fin}</td>

              <td>
                ${Number(reserva.precio_total).toFixed(2)}
              </td>

              <td>{reserva.estado}</td>

              <td>
                <button
                  type="button"
                  onClick={() => onEditar(reserva)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onEliminar(reserva.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservaTable;