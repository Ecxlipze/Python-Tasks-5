from pathlib import Path

from PyPDF2 import PdfReader
from rest_framework import filters
from rest_framework import parsers
from rest_framework import viewsets

from .models import Resume
from .serializers import ResumeSerializer
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

    def _extract_resume_text(self, resume_file):
        file_extension = Path(resume_file.name).suffix.lower()

        if file_extension != ".pdf":
            return ""

        reader = PdfReader(resume_file)
        pages = []

        for page in reader.pages:
          page_text = page.extract_text() or ""
          if page_text.strip():
              pages.append(page_text.strip())

        return "\n\n".join(pages)

    def perform_create(self, serializer):
        resume = serializer.save()
        extracted_text = self._extract_resume_text(resume.resume_file)

        if extracted_text != resume.extracted_text:
            resume.extracted_text = extracted_text
            resume.save(update_fields=["extracted_text"])
