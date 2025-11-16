// src/pages/MapaZonasPage.jsx
import { useEffect, useState } from "react";
import { api } from "../services/api";
import MapaZonas from "../components/MapaZonas";
import "../styles/mapa-zonas.css";

function MapaZonasPage() {
  const [zonas, setZonas] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [zonasRes, alertasRes] = await Promise.all([
          api.get("/zonas/"),
          api.get("/alertas/"),
        ]);

        setZonas(zonasRes.data);
        setAlertas(alertasRes.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo obtener la información del servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mapa-page">
      <div className="mapa-page-inner">
        {/* Encabezado */}
        <header className="mapa-header">
          <div className="app-badge">Mapa de zonas críticas</div>
          <h1>Visualización de zonas y alertas</h1>
          <p>
            Zonas críticas de inundación del municipio de Cochabamba-Cercado y
            alertas activas, obtenidas desde la API REST del backend.
          </p>
          {loading && (
            <p className="status-text">
              Cargando datos desde el servidor…
            </p>
          )}
          {error && <p className="status-error">{error}</p>}
        </header>

        {/* Contenido principal */}
        <main className="mapa-main">
          {/* Columna IZQUIERDA: Zonas + mapa */}
          <section className="mapa-zonas-card">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Zonas críticas registradas</h2>
                <p className="card-caption">
                  Información almacenada en la base de datos PostgreSQL.
                </p>
              </div>

              {zonas.length === 0 ? (
                <p className="status-text">
                  No hay zonas críticas registradas.
                </p>
              ) : (
                <ul className="zone-list">
                  {zonas.map((zona) => (
                    <li className="zone-item" key={zona.id}>
                      <div className="zone-name">{zona.nombre}</div>
                      {zona.descripcion && (
                        <div className="zone-desc">{zona.descripcion}</div>
                      )}
                      <div className="zone-coords">
                        Lat: {zona.latitud} · Lng: {zona.longitud}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {zonas.length > 0 && <MapaZonas zonas={zonas} />}
            </div>
          </section>

          {/* Columna DERECHA: Alertas */}
          <section className="mapa-alertas-card">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Alertas activas</h2>
                <p className="card-caption">
                  Estados de alerta asociados a cada zona crítica.
                </p>
              </div>

              <div className="mapa-alertas-scroll">
                {alertas.length === 0 ? (
                  <p className="status-text">
                    Actualmente no hay alertas activas.
                  </p>
                ) : (
                  <ul className="alert-list">
                    {alertas.map((alerta) => {
                      const nivelClass = `alert-badge alert-badge--${alerta.nivel}`;
                      return (
                        <li className="alert-item" key={alerta.id}>
                          <div className="alert-header">
                            <span className={nivelClass}>
                              {alerta.nivel.toUpperCase()}
                            </span>
                            <span className="alert-zone">
                              {alerta.zona
                                ? alerta.zona.nombre
                                : "Zona sin datos"}
                            </span>
                          </div>
                          <p className="alert-message">{alerta.mensaje}</p>
                          <div className="alert-date">
                            {alerta.fecha_hora
                              ? new Date(alerta.fecha_hora).toLocaleString()
                              : "Sin fecha registrada"}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MapaZonasPage;
