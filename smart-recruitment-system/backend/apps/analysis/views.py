import re

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Analysis
from .serializers import AnalysisSerializer
from core.pagination import DefaultPagination
from apps.resumes.models import Resume
from apps.jobs.models import Job

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

    def _extract_skills(self, resume_text, job):
        text = resume_text.lower()
        skills = []
        source_skills = list(job.required_skills or [])

        if job.title:
            source_skills.append(job.title)

        if job.description:
            source_skills.extend(re.split(r"[,\n/|]", job.description))

        for skill in source_skills:
            cleaned = skill.strip()
            if not cleaned:
                continue
            if cleaned.lower() in text and cleaned.lower() not in [s.lower() for s in skills]:
                skills.append(cleaned.title())

        return skills

    def _build_analysis(self, resume: Resume, job: Job):
        extracted_skills = self._extract_skills(resume.extracted_text, job)
        required_skills = [skill for skill in (job.required_skills or []) if skill]
        matched = {
            skill.lower()
            for skill in extracted_skills
            if skill.lower() in {required.lower() for required in required_skills}
        }

        if required_skills:
            match_score = round((len(matched) / len(required_skills)) * 100, 2)
        else:
            match_score = 0.0

        if match_score >= 80:
            recommendation = "Strong Match"
            summary = "Candidate is highly aligned with the role."
        elif match_score >= 50:
            recommendation = "Review Further"
            summary = "Candidate is a moderate fit and should be reviewed."
        else:
            recommendation = "Not a Strong Match"
            summary = "Candidate needs additional alignment for this role."

        missing_skills = [
            skill
            for skill in required_skills
            if skill.lower() not in {match.lower() for match in extracted_skills}
        ]

        if missing_skills:
            summary = f"{summary} Missing skills: {', '.join(missing_skills)}."

        return {
            "resume": resume,
            "extracted_skills": extracted_skills,
            "match_score": match_score,
            "recommendation": recommendation,
            "summary": summary,
        }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resume = serializer.validated_data["resume"]
        job = resume.job
        analysis_data = self._build_analysis(resume, job)

        analysis, created = Analysis.objects.update_or_create(
            resume=resume,
            defaults=analysis_data,
        )

        output = self.get_serializer(analysis)
        return Response(
            output.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )
