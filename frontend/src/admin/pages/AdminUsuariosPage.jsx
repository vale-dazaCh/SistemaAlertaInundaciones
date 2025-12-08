import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/usuarios/");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Administración de Usuarios</h1>

        <div className="admin-card">
          <h2>Listado de usuarios</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.first_name}</td>
                  <td>{u.email}</td>
                  <td>{u.is_staff ? "Administrador" : "Usuario general"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuariosPage;

