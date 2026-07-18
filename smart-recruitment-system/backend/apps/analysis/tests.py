from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from apps.analysis.models import Analysis
from apps.analysis.services import analyze_resume
from apps.candidates.models import Candidate
from apps.jobs.models import Job
from apps.resumes.models import Resume


class AnalyzeResumeServiceTests(TestCase):
    def setUp(self):
        self.recruiter = User.objects.create_user(
            username="recruiter",
            email="recruiter@example.com",
            password="password123",
        )
        self.candidate = Candidate.objects.create(
            full_name="John Doe",
            email="john@example.com",
            phone="1234567890",
            experience=3,
            education="BS Computer Science",
        )
        self.job = Job.objects.create(
            recruiter=self.recruiter,
            title="Python Developer",
            company="OpenAI",
            description="Build AI systems using Python, Django, REST API, and Docker.",
            required_skills=["Python", "Django", "REST API", "Docker"],
            location="Remote",
        )
        self.resume = Resume.objects.create(
            candidate=self.candidate,
            job=self.job,
            resume_file=SimpleUploadedFile(
                "resume.pdf",
                b"%PDF-1.4 dummy resume content",
                content_type="application/pdf",
            ),
            extracted_text=(
                "Python developer with Django and REST API experience. "
                "Built production systems in Python."
            ),
        )

    def test_analyze_resume_returns_expected_output(self):
        result = analyze_resume(self.resume, self.job)

        self.assertEqual(result["resume"], self.resume)
        self.assertEqual(result["recommendation"], "Review Further")
        self.assertEqual(result["match_score"], 75.0)
        self.assertEqual(
            result["extracted_skills"],
            ["Python", "Django", "Rest Api"],
        )
        self.assertEqual(result["summary"], "Candidate is a moderate fit and should be reviewed. Missing skills: Docker.")

    def test_analysis_record_can_be_created_from_service_output(self):
        result = analyze_resume(self.resume, self.job)

        analysis = Analysis.objects.create(
            resume=self.resume,
            extracted_skills=result["extracted_skills"],
            match_score=result["match_score"],
            recommendation=result["recommendation"],
            summary=result["summary"],
        )

        self.assertEqual(analysis.resume, self.resume)
        self.assertEqual(analysis.recommendation, "Review Further")
