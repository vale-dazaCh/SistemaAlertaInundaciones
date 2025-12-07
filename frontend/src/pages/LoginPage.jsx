import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function LoginPage() {
  const navigate = useNavigate();   // 👈 SE AGREGA AQUÍ

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Credenciales inválidas ❌");
        return;
      }

      alert("Inicio de sesión exitoso 🚀");

      // ⬅ YA FUNCIONA
      navigate("/usuario");

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

    } catch (error) {
      alert("Error al conectar con el servidor");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-layout">

        <section className="login-info">
          <h1 className="login-title">Ingresar al sistema</h1>
          <p className="login-subtitle">
            Accede al sistema de alerta temprana para ver zonas críticas,
            registrar información o gestionar alertas.
          </p>

          <p className="login-text">
            Solo usuarios registrados pueden ingresar. Si aún no tienes una cuenta,
            puedes crearla en la sección de registro.
          </p>
        </section>

        <section className="login-form-wrapper">
          <div className="card login-card">
            <div className="card-header">
              <h2 className="card-title">Iniciar sesión</h2>
              <p className="card-caption">Introduce tus credenciales</p>
            </div>

            <form onSubmit={handleSubmit} className="form-layout">
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
                />
              </label>

              <button type="submit" className="btn-primary">
                Ingresar
              </button>
            </form>

            <p className="login-back-link">
              <Link to="/registro" className="link-inline">
                ¿No tienes cuenta? Regístrate →
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;


