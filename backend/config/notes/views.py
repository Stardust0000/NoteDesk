from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Notes
from .serializers import NotesSerializer

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

@api_view(["PATCH"])
def note_update(request,id):
    try:
        note = Notes.objects.get(id=id) # fetch notes of id from DB
    except:
        return Response(
            {"error" : "Note does not exists"}, 
            status=status.HTTP_400_BAD_REQUEST
             )
    serializer = NotesSerializer(instance = note, data = request.data, partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
def note_delete(request, id):
    try:
        note = Notes.objects.filter(id = id)
    except Notes.DoesNotExist:
        return Response(
            {"error" : "Note does not exists"},
             status=status.HTTP_404_NOT_FOUND
        )
    note.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)