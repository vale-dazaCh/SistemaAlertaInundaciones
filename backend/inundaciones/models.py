from django.db import models


class ZonaCritica(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    latitud = models.FloatField()
    longitud = models.FloatField()

    def __str__(self):
        return self.nombre


class EstacionMeteorologica(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=50, unique=True)
    latitud = models.FloatField()
    longitud = models.FloatField()

    def __str__(self):
        return f"{self.nombre} ({self.codigo})"


class LecturaMeteorologica(models.Model):
    estacion = models.ForeignKey(
        EstacionMeteorologica,
        on_delete=models.CASCADE,
        related_name="lecturas",
    )
    fecha_hora = models.DateTimeField()
    precipitacion_mm = models.FloatField()

    def __str__(self):
        return f"{self.estacion.codigo} - {self.fecha_hora} - {self.precipitacion_mm} mm"


class Alerta(models.Model):
    NIVEL_CHOICES = [
        ("verde", "Verde"),
        ("amarilla", "Amarilla"),
        ("roja", "Roja"),
    ]

    zona = models.ForeignKey(
        ZonaCritica,
        on_delete=models.CASCADE,
        related_name="alertas",
    )
    nivel = models.CharField(max_length=10, choices=NIVEL_CHOICES)
    mensaje = models.TextField()
    fecha_hora = models.DateTimeField(auto_now_add=True)
    activa = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.zona.nombre} - {self.nivel} - {self.fecha_hora}"
