from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(
        source="candidate.full_name",
        read_only=True,
    )
    job_title = serializers.CharField(
        source="job.title",
        read_only=True,
    )

    class Meta:
        model = Resume
        fields = [
            "id",
            "candidate",
            "candidate_name",
            "job",
            "job_title",
            "resume_file",
            "extracted_text",
            "uploaded_at",
        ]
        read_only_fields = [
            "id",
            "candidate_name",
            "job_title",
            "extracted_text",
            "uploaded_at",
        ]
