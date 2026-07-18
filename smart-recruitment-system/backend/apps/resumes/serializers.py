from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = [
            "id",
            "candidate",
            "job",
            "resume_file",
            "extracted_text",
            "uploaded_at",
        ]
        read_only_fields = [
            "uploaded_at",
        ]