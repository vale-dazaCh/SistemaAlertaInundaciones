// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import aguaVideo from "../media/agua.mp4";

function HomePage() {
  return (
    <>
      {/* HERO con video de fondo */}
      <section className="hero">
        <div className="hero-media">
          <video
            className="hero-video"
            src={aguaVideo}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-overlay">
            <div className="hero-inner">
              <h1 className="hero-title">
                Sistema de Alerta Temprana de Inundaciones en Cercado
              </h1>
              <p className="hero-subtitle">
                Plataforma web para apoyar a autoridades y ciudadanía en la
                identificación de <strong>zonas críticas</strong> y en la
                visualización de <strong>alertas tempranas</strong> frente a
                eventos de inundación en el municipio de Cochabamba – Cercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="home-content">
        <div className="app-grid">
          {/* Tarjeta 1: Descripción general */}
          <section>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Descripción general</h2>
                <p className="card-caption">
                  Módulo web basado en React, Django y PostgreSQL/PostGIS.
                </p>
              </div>

              <p>
                El sistema permite registrar y visualizar zonas vulnerables a
                inundaciones en el municipio de Cochabamba-Cercado, así como las
                alertas activas asociadas a dichas zonas.
              </p>

              <p>
                La solución se centra en la{" "}
                <strong>visualización geográfica</strong> y en la{" "}
                <strong>gestión de alertas</strong> para apoyar la toma de
                decisiones de autoridades y ciudadanía, según lo descrito en el
                perfil del proyecto.
              </p>

              <div
                style={{
                  marginTop: "1.2rem",
                  display: "flex",
                  gap: "0.8rem",
                  flexWrap: "wrap",
                }}
              >
                <Link to="/mapa-zonas" className="btn-primary">
                  Ver mapa de zonas críticas
                </Link>
                <Link to="/registro" className="btn-outline">
                  Ir a registro de usuario
                </Link>
              </div>
            </div>
          </section>

          {/* Tarjeta 2: Funcionalidades principales */}
          <section>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Funcionalidades principales</h2>
                <p className="card-caption">
                  Vista inicial del prototipo web según el perfil.
                </p>
              </div>

              <ul className="feature-list">
                <li>
                  Visualización de <strong>zonas críticas</strong> de
                  inundación sobre un mapa interactivo.
                </li>
                <li>
                  Listado de <strong>alertas activas</strong> clasificadas por
                  nivel (verde, amarilla, roja) y asociadas a cada zona.
                </li>
                <li>
                  Integración de <strong>frontend React</strong> con{" "}
                  <strong>API REST en Django</strong> y base de datos{" "}
                  <strong>PostgreSQL / PostGIS</strong>.
                </li>
                <li>
                  Página de <strong>registro de usuario</strong> como punto de
                  entrada para la futura gestión de cuentas y perfiles.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default HomePage;


