from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from inundaciones.views import (
    ZonaCriticaViewSet,
    AlertaActivaViewSet,
    EstacionMeteorologicaViewSet,
    LecturaMeteorologicaViewSet,
)

router = DefaultRouter()
router.register("zonas", ZonaCriticaViewSet, basename="zona")
router.register("alertas", AlertaActivaViewSet, basename="alerta")
router.register("estaciones", EstacionMeteorologicaViewSet, basename="estacion")
router.register("lecturas", LecturaMeteorologicaViewSet, basename="lectura")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    # 👇 Nueva API de autenticación
    path("api/auth/", include("api_auth.urls")),
    path("api/admin/", include("adminpanel.urls")),

]
