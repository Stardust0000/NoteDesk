from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Notes
from .serializers import NotesSerializer

# Create your views here.
# class NotesViewSet(viewsets.ModelViewSet):
#     queryset = Notes.objects.all()
#     serializer_class = NotesSerializer

@api_view(["GET","POST"])
def notes_list(request):
    if request.method == "GET":
        notes = Notes.objects.all() # fetch notes from db
        serializer = NotesSerializer(notes, many=True) #serialize model obj into json
        return Response(serializer.data) # return json to client
    if request.method == "POST":
        serializer = NotesSerializer(data = request.data) # load incoming json
        if serializer.is_valid(): # validate against model fields
            serializer.save() # creates new note in DB
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)