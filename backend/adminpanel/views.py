from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from inundaciones.models import ZonaCritica, Alerta
from django.contrib.auth.models import User
import requests
from rest_framework.permissions import AllowAny


from .serializers import (
    ZonaCriticaSerializer,
    AlertaSerializer,
    UsuarioSerializer
)


# ----------------------
# CRUD ZONAS CRITICAS
# ----------------------
@api_view(["GET"])
@permission_classes([IsAdminUser])
def zonas_list(request):
    zonas = ZonaCritica.objects.all()
    return Response(ZonaCriticaSerializer(zonas, many=True).data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def zonas_create(request):
    serializer = ZonaCriticaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def zonas_update(request, pk):
    zona = ZonaCritica.objects.get(id=pk)
    serializer = ZonaCriticaSerializer(zona, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def zonas_delete(request, pk):
    zona = ZonaCritica.objects.get(id=pk)
    zona.delete()
    return Response({"detail": "Zona eliminada"})


# ----------------------
# CRUD ALERTAS
# ----------------------
@api_view(["GET"])
@permission_classes([IsAdminUser])
def alertas_list(request):
    return Response(AlertaSerializer(Alerta.objects.all(), many=True).data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def alertas_create(request):
    serializer = AlertaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# ----------------------
# ADMINISTRACIÓN DE USUARIOS
# ----------------------
@api_view(["GET"])
@permission_classes([IsAdminUser])
def usuarios_list(request):
    usuarios = User.objects.all()
    return Response(UsuarioSerializer(usuarios, many=True).data)

@api_view(["GET"])
@permission_classes([AllowAny])  # puedes restringirlo luego
def clima_actual(request):
    lat = request.query_params.get("lat", "-17.39")   # Cochabamba
    lon = request.query_params.get("lon", "-66.15")

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}&longitude={lon}&current=temperature_2m,precipitation,rain"
    )

    try:
        r = requests.get(url)
        data = r.json()
        return Response({
            "lat": lat,
            "lon": lon,
            "temperatura": data.get("current", {}).get("temperature_2m"),
            "precipitacion": data.get("current", {}).get("precipitation"),
            "lluvia": data.get("current", {}).get("rain"),
        })
    except Exception as e:
        return Response({"error": "No se pudo obtener datos climáticos", "detail": str(e)}, status=500)
