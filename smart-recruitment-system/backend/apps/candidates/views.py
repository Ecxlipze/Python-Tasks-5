from rest_framework import viewsets
from .models import Candidate
from .serializers import CandidateSerializer
from core.pagination import DefaultPagination

class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        return Candidate.objects.order_by("-created_at")