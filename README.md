# Sistema de Alerta Temprana de Inundaciones – Cercado 🌧️

Repositorio del prototipo web de un **Sistema de Alerta Temprana de Inundaciones** para el municipio de **Cochabamba – Cercado**.  

El sistema permite:

- Registrar y visualizar **zonas críticas** de inundación.
- Consultar **alertas activas** (verde, amarilla, roja) asociadas a cada zona.
- Mostrar la información en un **mapa interactivo** (Leaflet).
- Ofrecer un flujo de **registro de usuario** (demo) para ciudadanía / autoridades.

---

## Arquitectura general

Monolito dividido en dos carpetas:

```text
SistemaAlertaInundaciones
├── backend    # API REST con Django + Django REST Framework + PostGIS
├── frontend   # SPA en React (Vite) para la interfaz web
└── README.md
