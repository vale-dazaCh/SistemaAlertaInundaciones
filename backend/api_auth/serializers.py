# api_auth/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    # Campo de solo lectura que mapea first_name → nombre
    nombre = serializers.CharField(source="first_name")

    class Meta:
        model = User
        fields = ["id", "nombre", "email"]


class RegisterSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    def create(self, validated_data):
        nombre = validated_data["nombre"]
        email = validated_data["email"]
        password = validated_data["password"]

        # username = email, pero nombre real en first_name
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=nombre,
        )
        return user
