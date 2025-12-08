from rest_framework import serializers
from inundaciones.models import ZonaCritica, Alerta
from django.contrib.auth.models import User


class ZonaCriticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZonaCritica
        fields = "__all__"


class AlertaSerializer(serializers.ModelSerializer):
    zona_nombre = serializers.CharField(source="zona.nombre", read_only=True)

    class Meta:
        model = Alerta
        fields = "__all__"


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "email", "is_staff"]
