from rest_framework import viewsets
from rest_framework import filters
from .models import Job
from .serializers import JobSerializer
from core.pagination import DefaultPagination

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    pagination_class = DefaultPagination

    search_fields = [
        "title",
        "company",
        "location",
    ]
    ordering_fields = "__all__"
    
    def get_queryset(self):
        return (
        Job.objects
        .select_related("recruiter")
        .order_by("-created_at")
    )