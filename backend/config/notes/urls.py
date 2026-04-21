from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.notes_list),
    path('notes/<int:id>/update/',views.note_update),
    path('notes/<int:id>/delete/', views.note_delete),
]
