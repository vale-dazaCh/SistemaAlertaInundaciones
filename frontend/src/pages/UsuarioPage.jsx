// src/pages/UsuarioPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/usuario.css";

function UsuarioPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Obtener datos del usuario desde el backend
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/api/auth/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="usuario-page">
      <div className="usuario-card">
        <h1 className="usuario-title">Bienvenido/a</h1>
        <p className="usuario-subtitle">
          Has iniciado sesión correctamente en el sistema SAT.
        </p>

        <div className="usuario-info">
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Rol:</strong> Usuario general</p>
        </div>

        <button className="btn-logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default UsuarioPage;
