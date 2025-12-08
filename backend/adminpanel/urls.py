from django.urls import path
from . import views

urlpatterns = [
    # ZONAS
    path("zonas/", views.zonas_list),
    path("zonas/crear/", views.zonas_create),
    path("zonas/<int:pk>/", views.zonas_update),
    path("zonas/<int:pk>/eliminar/", views.zonas_delete),

    # ALERTAS
    path("alertas/", views.alertas_list),
    path("alertas/crear/", views.alertas_create),

    # USUARIOS
    path("usuarios/", views.usuarios_list),
]
