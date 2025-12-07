# backend/api_auth/views.py
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import UserSerializer
@api_view(["POST"])
def registro_view(request):
    nombre = request.data.get("nombre")
    email = request.data.get("email")
    password = request.data.get("password")

    if not nombre or not email or not password:
        return Response(
            {"detail": "Todos los campos son obligatorios."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=nombre,
            password=password
        )
    except IntegrityError:
        return Response(
            {"detail": "El correo ya está registrado."},
            status=status.HTTP_400_BAD_REQUEST
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "detail": "Usuario registrado correctamente.",
        "user": UserSerializer(user).data,
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }, status=status.HTTP_201_CREATED)


@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(username=email, password=password)
    if not user:
        return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)

    return Response({
        "user": {
            "id": user.id,
            "email": user.email,
            "nombre": user.first_name,
        },
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })



@api_view(["POST"])
def refresh_view(request):
    try:
        refresh_token = request.data["refresh"]
        refresh = RefreshToken(refresh_token)
        access = refresh.access_token
        return Response({"access": str(access)})
    except Exception:
        return Response({"detail": "Token inválido"}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    user = request.user
    return Response(UserSerializer(user).data)
