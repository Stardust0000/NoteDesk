from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from .models import Notes
from .serializers import NotesSerializer

# Signup function
@api_view(["POST"])
def register_user(request):
    username = request.data.get("username");
    password = request.data.get("password");

    # validation
    if not username or not password:
        return Response(
            {"message":"Invalid Username or Password"}, status=status.HTTP_400_BAD_REQUEST
            ) 
    # check for duplicate username
    if User.objects.filter(username=username).exists():
        return Response(
            {"message": "Username already exists"}, 
            status=400)
    # create user
    User.objects.create_user(username=username, password=password)

    return Response(
        {"message":"User created successfully"}, status=status.HTTP_201_CREATED)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def notes_list(request):
    if request.method == "GET":
        notes = Notes.objects.filter(user=request.user) # fetch notes from db
        serializer = NotesSerializer(notes, many=True) #serialize model obj into json
        return Response(serializer.data) # return json to client
    if request.method == "POST":
        serializer = NotesSerializer(data = request.data) # load incoming json
        if serializer.is_valid(): # validate against model fields
            serializer.save(user=request.user) # creates new note in DB
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def note_update(request,id):
    try:
        note = Notes.objects.get(id=id, user=request.user) # fetch notes of id from DB
    except Notes.DoesNotExist:
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
@permission_classes([IsAuthenticated])
def note_delete(request, id):
    try:
        note = Notes.objects.get(id = id,user=request.user)
    except Notes.DoesNotExist:
        return Response(
            {"error" : "Note does not exists"},
             status=status.HTTP_404_NOT_FOUND
        )
    note.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)