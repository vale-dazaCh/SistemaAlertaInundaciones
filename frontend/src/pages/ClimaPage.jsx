import { useEffect, useState } from "react";

function ClimaPage() {
  const [clima, setClima] = useState(null);

  const cargarClima = async () => {
    const res = await fetch("http://localhost:8000/api/admin/clima/?lat=-17.39&lon=-66.15");
    const data = await res.json();
    setClima(data);
  };

  useEffect(() => {
    cargarClima();
  }, []);

  return (
    <div className="admin-content">
      <h1>Clima en tiempo real</h1>

      {!clima ? (
        <p>Cargando...</p>
      ) : (
        <div className="admin-card">
          <h2>Datos actuales</h2>
          <p><strong>Temperatura:</strong> {clima.temperatura}°C</p>
          <p><strong>Precipitación:</strong> {clima.precipitacion} mm</p>
          <p><strong>Lluvia:</strong> {clima.lluvia} mm</p>
        </div>
      )}
    </div>
  );
}

export default ClimaPage;
