import { Routes, Route, NavLink } from "react-router-dom";

// Páginas públicas
import HomePage from "./pages/HomePage";
import RegistroPage from "./pages/RegistroPage";
import MapaZonasPage from "./pages/MapaZonasPage";
import LoginPage from "./pages/LoginPage";
import UsuarioPage from "./pages/UsuarioPage";

// Panel Admin
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminZonasPage from "./admin/pages/AdminZonasPage";
import AdminAlertasPage from "./admin/pages/AdminAlertasPage";
import AdminUsuariosPage from "./admin/pages/AdminUsuariosPage";

function App() {
  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!access;

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="top-nav">
        <div className="top-nav-inner">
          <div className="top-nav-left">
            <div className="top-nav-logo">SAT</div>
            <div className="top-nav-text">
              <div className="top-nav-project">Sistema de Alerta Temprana</div>
              <div className="top-nav-subtitle">
                Inundaciones · Cochabamba – Cercado
              </div>
            </div>
          </div>

          <div className="top-nav-links">
            {/* Inicio */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Inicio
            </NavLink>

            {/* SOLO si NO está logueado */}
            {!isLoggedIn && (
              <>
                <NavLink
                  to="/registro"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                >
                  Registro
                </NavLink>

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                >
                  Iniciar sesión
                </NavLink>
              </>
            )}

            {/* Siempre visible */}
            <NavLink
              to="/mapa-zonas"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Mapa de zonas
            </NavLink>

            {/* SI ESTÁ LOGUEADO → botón de cierre de sesión */}
            {isLoggedIn && (
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mapa-zonas" element={<MapaZonasPage />} />

        {/* PÁGINA DE USUARIO */}
        {role === "general" && (
          <Route path="/usuario" element={<UsuarioPage />} />
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/zonas" element={<AdminZonasPage />} />
            <Route path="/admin/alertas" element={<AdminAlertasPage />} />
            <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;


