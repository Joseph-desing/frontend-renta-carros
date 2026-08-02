import "./Table.css";

function VehiculoTable({
  vehiculos,
  onEditar,
  onEliminar,
}) {
  if (vehiculos.length === 0) {
    return <p>No existen vehículos registrados.</p>;
  }

  return (
    <div className="table-card">
      <h3>Lista de vehículos</h3>

      <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Color</th>
            <th>Precio por día</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.anio}</td>
              <td>{vehiculo.color}</td>
              <td>${Number(vehiculo.precio_dia).toFixed(2)}</td>
              <td><span className={`badge badge-${vehiculo.estado.toLowerCase()}`}>{vehiculo.estado}</span></td>

              <td><div className="table-actions">
                <button
                  className="action-btn action-edit"
                  type="button"
                  onClick={() => onEditar(vehiculo)}
                >
                  Editar
                </button>

                <button
                  className="action-btn action-delete"
                  type="button"
                  onClick={() => onEliminar(vehiculo.id)}
                >
                  Eliminar
                </button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default VehiculoTable;
