from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from inundaciones.models import ZonaCritica, Alerta
from django.contrib.auth.models import User

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
