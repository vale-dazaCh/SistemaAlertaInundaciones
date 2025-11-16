from django.contrib import admin
from .models import ZonaCritica, EstacionMeteorologica, LecturaMeteorologica, Alerta

admin.site.register(ZonaCritica)
admin.site.register(EstacionMeteorologica)
admin.site.register(LecturaMeteorologica)
admin.site.register(Alerta)
