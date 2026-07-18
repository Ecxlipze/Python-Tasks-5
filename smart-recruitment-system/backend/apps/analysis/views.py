import logging

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Analysis
from .services import analyze_resume
from .serializers import AnalysisSerializer
from core.pagination import DefaultPagination

logger = logging.getLogger(__name__)

class AnalysisViewSet(viewsets.ModelViewSet):
    serializer_class = AnalysisSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)

            resume = serializer.validated_data["resume"]
            job = resume.job
            analysis_data = analyze_resume(resume, job)

            analysis, created = Analysis.objects.update_or_create(
                resume=resume,
                defaults=analysis_data,
            )

            output = self.get_serializer(analysis)
            return Response(
                output.data,
                status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
            )
        except Exception:
            logger.exception("Failed to create analysis")
            raise
