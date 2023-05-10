from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer

class ProjectSerializer(viewsets.ModelSerializer):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer