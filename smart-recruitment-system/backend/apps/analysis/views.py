from rest_framework import viewsets
from .models import Analysis
from .serializers import AnalysisSerializer
from core.pagination import DefaultPagination

class AnalysisViewSet(viewsets.ModelViewSet):
    serializer_class = AnalysisSerializer
    pagination_class = DefaultPagination
    search_fields = [
        "recommendation",
        "resume__candidate__full_name",
    ]
    ordering_fields = [
        "match_score",
        "created_at",
    ]

    def get_queryset(self):
        return (
            Analysis.objects
            .select_related(
                "resume",
                "resume__candidate",
                "resume__job",
            )
            .order_by("-created_at")
        )