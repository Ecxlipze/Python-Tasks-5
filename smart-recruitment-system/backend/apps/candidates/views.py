from rest_framework import viewsets
from rest_framework import filters
from .models import Candidate
from .serializers import CandidateSerializer
from core.pagination import DefaultPagination

class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        "full_name",
        "email",
        "phone",
        "education",
    ]
    ordering_fields = "__all__"

    def get_queryset(self):
        return Candidate.objects.order_by("-created_at")
