from rest_framework import viewsets
from .models import Resume
from .serializers import ResumeSerializer
from core.pagination import DefaultPagination

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    pagination_class = DefaultPagination
    search_fields = [
        "candidate__full_name",
        "job__title",
    ]
    ordering_fields = [
        "uploaded_at",
    ]
    def get_queryset(self):
        return (
            Resume.objects
            .select_related(
                "candidate",
                "job",
            )
            .order_by("-uploaded_at")
        )