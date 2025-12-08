import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/alertas.css";

function AdminAlertasPage() {
  const [alertas, setAlertas] = useState([]);
  const [zonas, setZonas] = useState([]);

  const [form, setForm] = useState({
    nivel: "",
    mensaje: "",
    zona: "",
  });

  // ================================
  // CARGAR ALERTAS
  // ================================
  const fetchAlertas = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch("http://localhost:8000/api/admin/alertas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAlertas(data);
    } catch (err) {
      console.error("Error cargando alertas:", err);
    }
  };

  // ================================
  // CARGAR ZONAS PARA SELECT
  // ================================
  const fetchZonas = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch("http://localhost:8000/api/admin/zonas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setZonas(data);
    } catch (err) {
      console.error("Error cargando zonas:", err);
    }
  };

  useEffect(() => {
    fetchAlertas();
    fetchZonas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ================================
  // CREAR ALERTA
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      await fetch("http://localhost:8000/api/admin/alertas/crear/", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nivel: form.nivel,
          mensaje: form.mensaje,
          zona: parseInt(form.zona),
        }),
      });

      alert("Alerta registrada ✔");

      setForm({ nivel: "", mensaje: "", zona: "" });
      fetchAlertas();
    } catch (err) {
      console.error("Error registrando alerta:", err);
      alert("Error registrando alerta");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Gestión de Alertas</h1>

        {/* FORMULARIO */}
        <div className="admin-card">
          <h2>Registrar nueva alerta</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Nivel de alerta
              <select name="nivel" value={form.nivel} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                <option value="verde">Verde</option>
                <option value="amarilla">Amarilla</option>
                <option value="roja">Roja</option>
              </select>
            </label>

            <label>
              Mensaje
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </label>

            <label>
              Zona
              <select name="zona" value={form.zona} onChange={handleChange} required>
                <option value="">Seleccione zona…</option>
                {zonas.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.nombre}
                  </option>
                ))}
              </select>
            </label>

            <button className="btn-primary">Guardar alerta</button>
          </form>
        </div>

        {/* LISTADO */}
        <div className="admin-card">
          <h2>Listado de alertas</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nivel</th>
                <th>Mensaje</th>
                <th>Zona</th>
              </tr>
            </thead>

            <tbody>
              {alertas.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.nivel}</td>
                  <td>{a.mensaje}</td>
                  <td>{a.zona_nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAlertasPage;

