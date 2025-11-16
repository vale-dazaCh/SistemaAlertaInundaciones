import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const zonaIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function MapaZonas({ zonas }) {
  const centro = [-17.39, -66.16];

  return (
    <div className="map-wrapper">
      <MapContainer center={centro} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {zonas.map((zona) => (
          <Marker
            key={zona.id}
            position={[zona.latitud, zona.longitud]}
            icon={zonaIcon}
          >
            <Popup>
              <b>{zona.nombre}</b>
              <br />
              {zona.descripcion || "Sin descripción"}
              <br />
              <small>
                Lat: {zona.latitud} | Lng: {zona.longitud}
              </small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapaZonas;
