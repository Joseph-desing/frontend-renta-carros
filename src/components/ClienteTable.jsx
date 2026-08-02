function ClienteTable({
  clientes,
  onEditar,
  onEliminar,
}) {
  if (clientes.length === 0) {
    return <p>No existen clientes registrados.</p>;
  }

  return (
    <div>
      <h3>Lista de clientes</h3>

      <table>
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

              <td>
                <button
                  type="button"
                  onClick={() => onEditar(cliente)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onEliminar(cliente.id)}
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

export default ClienteTable;