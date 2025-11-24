// src/pages/RegistroPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/registro.css"; // 👈 estilos específicos de la página

function RegistroPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "ciudadania",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí luego se puede hacer POST a Django.
    console.log("Datos de registro (demo):", form);
    alert(
      "Registro de ejemplo enviado.\nEn la siguiente fase se conectará este formulario al backend."
    );
  };

  return (
    <div className="registro-page">
      <div className="registro-layout">
        {/* COLUMNA IZQUIERDA: texto explicativo */}
        <section className="registro-info">
          <h1 className="registro-title">Crear cuenta en el sistema</h1>
          <p className="registro-subtitle">
            Este formulario representa el flujo de registro para autoridades y
            ciudadanía descrito en el perfil del proyecto.
          </p>

          <h2 className="registro-question">
            ¿Por qué un registro de usuario?
          </h2>

          <p className="registro-text">
            En versiones posteriores, el sistema permitirá que las{" "}
            <strong>autoridades</strong> y la{" "}
            <strong>ciudadanía</strong> ingresen con sus propias credenciales
            para consultar el estado de las zonas críticas, registrar
            observaciones y recibir alertas personalizadas.
          </p>

          <p className="registro-text">
            En este prototipo el formulario es sólo demostrativo, pero respeta
            los campos mínimos definidos en el perfil del proyecto.
          </p>
        </section>

        {/* COLUMNA DERECHA: formulario dentro de tarjeta */}
        <section className="registro-form-wrapper">
          <div className="card registro-card">
            <div className="card-header">
              <h2 className="card-title">Datos básicos</h2>
              <p className="card-caption">
                Campos mínimos para crear una cuenta en el sistema.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="form-layout">
              <label className="form-field">
                <span>Nombre completo</span>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Correo electrónico</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Contraseña</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </label>

              

              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: "0.7rem" }}
              >
                Registrarse (demo)
              </button>

              <p className="form-note">
                En una versión posterior, estos datos se enviarán al backend
                Django para crear el usuario en la base de datos.
              </p>
            </form>

            <p className="registro-back-link">
              <Link to="/" className="link-inline">
                ← Volver a la página de inicio
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RegistroPage;

