import logging

from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception:
            logger.exception("Failed to register user")
            raise
