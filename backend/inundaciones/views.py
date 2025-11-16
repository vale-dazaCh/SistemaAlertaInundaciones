from rest_framework import viewsets
from .models import ZonaCritica, EstacionMeteorologica, LecturaMeteorologica, Alerta
from .serializers import (
    ZonaCriticaSerializer,
    EstacionMeteorologicaSerializer,
    LecturaMeteorologicaSerializer,
    AlertaSerializer,
)


class ZonaCriticaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Solo lectura: lista de zonas críticas y detalle por id.
    GET /api/zonas/
    GET /api/zonas/<id>/
    """
    queryset = ZonaCritica.objects.all()
    serializer_class = ZonaCriticaSerializer


class AlertaActivaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Lista solo las alertas ACTIVAS.
    GET /api/alertas/
    GET /api/alertas/<id>/
    """
    queryset = Alerta.objects.filter(activa=True).select_related("zona")
    serializer_class = AlertaSerializer


# OPCIONAL: si luego quieres estaciones y lecturas:

class EstacionMeteorologicaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EstacionMeteorologica.objects.all()
    serializer_class = EstacionMeteorologicaSerializer


class LecturaMeteorologicaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LecturaMeteorologica.objects.all()
    serializer_class = LecturaMeteorologicaSerializer
