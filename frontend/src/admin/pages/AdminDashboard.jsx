// src/admin/pages/AdminDashboard.jsx
import { Link } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Panel Administrativo</h1>
      <p className="admin-subtitle">
        Gestión central del Sistema de Alerta Temprana — módulo exclusivo para administradores.
      </p>

      <div className="admin-grid">
        {/* CARD — Zonas Críticas */}
        <Link to="/admin/zonas" className="admin-card">
          <h2>Zonas Críticas</h2>
          <p>Registrar, modificar y eliminar zonas con riesgo de inundación.</p>
        </Link>

        {/* CARD — Alertas */}
        <Link to="/admin/alertas" className="admin-card">
          <h2>Alertas</h2>
          <p>Crear alertas de riesgo y actualizar su estado en tiempo real.</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

