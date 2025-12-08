import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/zonas.css";

function AdminZonasPage() {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    latitud: "",
    longitud: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("access");

  // ============================================================
  // === ESTADO PARA CLIMA (nuevo) ==============================
  // ============================================================
  const [climas, setClimas] = useState({});

  // ============================================================
  // === FUNCIÓN PARA OBTENER CLIMA POR ZONA ====================
  // ============================================================
  const obtenerClima = async (zona) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/admin/clima/?lat=${zona.latitud}&lon=${zona.longitud}`
    );

      const data = await res.json();

      setClimas((prev) => ({
        ...prev,
        [zona.id]: data,
      }));
    } catch (err) {
      console.error("Error obteniendo clima:", err);
    }
  };

  // ============================================================
  // === CARGAR ZONAS ===========================================
  // ============================================================
  const cargarZonas = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/zonas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setZonas(data);
    } catch (error) {
      console.error("Error cargando zonas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarZonas();
  }, []);

  // ============================================================
  // === OBTENER CLIMA AUTOMÁTICO AL CARGAR ZONAS ===============
  // ============================================================
  useEffect(() => {
    if (zonas.length > 0) {
      zonas.forEach((z) => obtenerClima(z));
    }
  }, [zonas]);

  // ============================================================
  // === MANEJO DEL FORMULARIO ==================================
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Crear zona
  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      latitud: parseFloat(form.latitud),
      longitud: parseFloat(form.longitud),
    };

    const res = await fetch("http://localhost:8000/api/admin/zonas/crear/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("❌ Error al registrar zona");
      return;
    }

    alert("✔ Zona registrada correctamente");
    setForm({ nombre: "", descripcion: "", latitud: "", longitud: "" });
    cargarZonas();
  };

  // Preparar edición
  const handleEditClick = (zona) => {
    setEditingId(zona.id);
    setForm({
      nombre: zona.nombre,
      descripcion: zona.descripcion,
      latitud: zona.latitud,
      longitud: zona.longitud,
    });
  };

  // Actualizar zona
  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      latitud: parseFloat(form.latitud),
      longitud: parseFloat(form.longitud),
    };

    const res = await fetch(
      `http://localhost:8000/api/admin/zonas/${editingId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      alert("❌ Error al actualizar zona");
      return;
    }

    alert("✔ Zona actualizada");
    setEditingId(null);
    setForm({ nombre: "", descripcion: "", latitud: "", longitud: "" });
    cargarZonas();
  };

  // Eliminar zona
  const eliminarZona = async (id) => {
    if (!confirm("¿Eliminar esta zona?")) return;

    const res = await fetch(
      `http://localhost:8000/api/admin/zonas/${id}/eliminar/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) return alert("❌ Error eliminando zona");

    alert("✔ Zona eliminada");
    cargarZonas();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <h1 className="admin-title">Gestión de Zonas Críticas</h1>

        {/* FORM */}
        <div className="admin-card">
          <h2>{editingId ? "Editar zona" : "Registrar nueva zona"}</h2>

          <form
            className="admin-form"
            onSubmit={editingId ? handleUpdate : handleCreate}
          >
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Descripción:
              <input
                type="text"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                required
              />
            </label>

            <div className="row">
              <label>
                Latitud:
                <input
                  type="number"
                  step="0.0001"
                  name="latitud"
                  value={form.latitud}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Longitud:
                <input
                  type="number"
                  step="0.0001"
                  name="longitud"
                  value={form.longitud}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button className="btn-primary">
              {editingId ? "Actualizar Zona" : "Registrar Zona"}
            </button>
          </form>
        </div>

        {/* LISTADO */}
        <div className="admin-card" style={{ marginTop: "2rem" }}>
          <h2>Zonas registradas</h2>

          {loading ? (
            <p>Cargando...</p>
          ) : zonas.length === 0 ? (
            <p>No hay zonas registradas</p>
          ) : (
           <table className="zonas-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Zona</th>
      <th>Ubicación</th>
      <th>Clima actual</th>
      <th>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {zonas.map((z) => (
      <tr key={z.id}>
        <td className="id-col">{z.id}</td>

        {/* Zona */}
        <td>
          <div className="zona-info">
            <strong>{z.nombre}</strong>
            <p className="zona-desc">{z.descripcion}</p>
          </div>
        </td>

        {/* Ubicación */}
        <td>
          <div className="coords">
            <span>📍 {z.latitud}</span>
            <span>📍 {z.longitud}</span>
          </div>
        </td>

        {/* Clima */}
        <td>
          {climas[z.id] ? (
            <div className="weather-box">
              <span className="badge temp">
                🌡 {climas[z.id].temperatura ?? "--"}°C
              </span>

              <span className="badge rain">
                🌧 Lluvia: {climas[z.id].lluvia ?? 0} mm
              </span>

              <span className="badge precip">
                ☔ Prec.: {climas[z.id].precipitacion ?? 0} mm
              </span>

              
            </div>
          ) : (
            <span>Cargando...</span>
          )}
        </td>

        {/* Acciones */}
        <td>
          <button className="btn-edit" onClick={() => handleEditClick(z)}>
            Editar
          </button>
          <button className="btn-delete" onClick={() => eliminarZona(z.id)}>
            Eliminar
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

          )}
        </div>
      </main>
    </div>
  );
}

export default AdminZonasPage;

