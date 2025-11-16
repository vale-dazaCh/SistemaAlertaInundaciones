from rest_framework import serializers
from .models import ZonaCritica, EstacionMeteorologica, LecturaMeteorologica, Alerta


class ZonaCriticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZonaCritica
        fields = "__all__"


class EstacionMeteorologicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstacionMeteorologica
        fields = "__all__"


class LecturaMeteorologicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturaMeteorologica
        fields = "__all__"


class AlertaSerializer(serializers.ModelSerializer):
    zona = ZonaCriticaSerializer(read_only=True)

    class Meta:
        model = Alerta
        fields = "__all__"
