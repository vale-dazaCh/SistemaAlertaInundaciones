import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegistroPage from "./pages/RegistroPage";
import MapaZonasPage from "./pages/MapaZonasPage";

function App() {
  return (
    <>
      {/* Barra superior fija */}
      <nav className="top-nav">
        <div className="top-nav-inner">
          <div className="top-nav-left">
            {/* Aquí luego puedes cambiar el texto SAT por un logo <img /> */}
            <div className="top-nav-logo">SAT</div>
            <div className="top-nav-text">
              <div className="top-nav-project">
                Sistema de Alerta Temprana
              </div>
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
            <NavLink
              to="/registro"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Registro
            </NavLink>
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
        <Route path="/mapa-zonas" element={<MapaZonasPage />} />
      </Routes>
    </>
  );
}

export default App;

