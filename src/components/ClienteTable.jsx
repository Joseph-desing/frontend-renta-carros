import "./Table.css";

function ClienteTable({
  clientes,
  onEditar,
  onEliminar,
}) {
  if (clientes.length === 0) {
    return <p>No existen clientes registrados.</p>;
  }

  return (
    <div className="table-card">
      <h3 className="table-title">Lista de clientes</h3>
      <div className="table-scroll">

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Vencimiento licencia</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.cedula}</td>
              <td>{cliente.nombres}</td>
              <td>{cliente.apellidos}</td>
              <td>{cliente.correo || "Sin correo"}</td>
              <td>{cliente.telefono || "Sin teléfono"}</td>
              <td>{cliente.direccion || "Sin dirección"}</td>
              <td>
                {cliente.licencia_conducir || "Sin fecha"}
              </td>

              <td><div className="table-actions">
                <button
                  className="action-btn action-edit"
                  type="button"
                  onClick={() => onEditar(cliente)}
                >
                  Editar
                </button>

                <button
                  className="action-btn action-delete"
                  type="button"
                  onClick={() => onEliminar(cliente.id)}
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

export default ClienteTable;
