from rest_framework import filters
from rest_framework import parsers
from rest_framework import viewsets

from .models import Resume
from .serializers import ResumeSerializer
from .services import extract_resume_text
from core.pagination import DefaultPagination

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    pagination_class = DefaultPagination
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
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

    def perform_create(self, serializer):
        resume = serializer.save()
        extracted_text = extract_resume_text(resume.resume_file)

        if extracted_text != resume.extracted_text:
            resume.extracted_text = extracted_text
            resume.save(update_fields=["extracted_text"])
