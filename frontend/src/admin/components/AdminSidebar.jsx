import { NavLink } from "react-router-dom";
import "../styles/admin.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">Panel Admin</h2>

      <nav className="admin-menu">
        <NavLink to="/admin" className="admin-link">📊 Dashboard</NavLink>
        <NavLink to="/admin/zonas" className="admin-link">🗺️ Zonas críticas</NavLink>
        <NavLink to="/admin/alertas" className="admin-link">🚨 Alertas</NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
