from rest_framework import serializers

from apps.candidates.models import Candidate
from apps.jobs.models import Job
from apps.resumes.models import Resume

from .models import Analysis


class AnalysisSerializer(serializers.ModelSerializer):
    resume = serializers.PrimaryKeyRelatedField(read_only=True)
    candidate = serializers.PrimaryKeyRelatedField(
        queryset=Candidate.objects.all(),
        write_only=True,
        required=True,
    )
    job = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(),
        write_only=True,
        required=True,
    )
    candidate_name = serializers.CharField(
        source="resume.candidate.full_name",
        read_only=True,
    )
    job_title = serializers.CharField(
        source="resume.job.title",
        read_only=True,
    )
    resume_file = serializers.CharField(
        source="resume.resume_file.url",
        read_only=True,
    )
    uploaded_at = serializers.DateTimeField(
        source="resume.uploaded_at",
        read_only=True,
    )
    missing_skills = serializers.SerializerMethodField()
    recommendations = serializers.SerializerMethodField()

    class Meta:
        model = Analysis
        fields = [
            "id",
            "resume",
            "candidate",
            "candidate_name",
            "job",
            "job_title",
            "resume_file",
            "extracted_skills",
            "missing_skills",
            "match_score",
            "recommendation",
            "recommendations",
            "summary",
            "uploaded_at",
            "created_at",
        ]
        read_only_fields = [
            "resume",
            "candidate_name",
            "job_title",
            "resume_file",
            "uploaded_at",
            "created_at",
        ]

    def get_missing_skills(self, obj):
        required_skills = obj.resume.job.required_skills or []
        extracted = {skill.lower() for skill in obj.extracted_skills}

        return [
            skill
            for skill in required_skills
            if skill and skill.lower() not in extracted
        ]

    def get_recommendations(self, obj):
        items = [obj.recommendation]
        if obj.summary:
            items.append(obj.summary)
        return items

    def validate(self, attrs):
        candidate = attrs.pop("candidate", None)
        job = attrs.pop("job", None)

        resume = (
            Resume.objects
            .filter(candidate=candidate, job=job)
            .order_by("-uploaded_at")
            .first()
        )

        if not resume:
            raise serializers.ValidationError(
                "No resume found for this candidate/job pair."
            )

        attrs["resume"] = resume
        return attrs
