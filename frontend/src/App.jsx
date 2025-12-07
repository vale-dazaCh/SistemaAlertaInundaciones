// src/App.jsx
import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegistroPage from "./pages/RegistroPage";
import MapaZonasPage from "./pages/MapaZonasPage";
import LoginPage from "./pages/LoginPage";
import UsuarioPage from "./pages/UsuarioPage";

function App() {
  const isLoggedIn = !!localStorage.getItem("access");

  return (
    <>
      {/* Barra superior fija */}
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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Inicio
            </NavLink>

            {!isLoggedIn && (
              <NavLink
                to="/registro"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                Registro
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                Iniciar sesión
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink
                to="/usuario"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                Usuario
              </NavLink>
            )}

            <NavLink
              to="/mapa-zonas"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Mapa de zonas
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mapa-zonas" element={<MapaZonasPage />} />
        <Route path="/usuario" element={<UsuarioPage />} />
      </Routes>
    </>
  );
}

export default App;

