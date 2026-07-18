from unittest.mock import patch

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase

from apps.candidates.models import Candidate
from apps.jobs.models import Job
from apps.resumes.models import Resume


class ResumeApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="recruiter",
            password="password123",
        )
        self.client.force_authenticate(user=self.user)
        self.candidate = Candidate.objects.create(
            full_name="Jane Smith",
            email="jane@example.com",
            phone="1234567890",
            experience=4,
            education="BS Computer Science",
        )
        self.job = Job.objects.create(
            recruiter=self.user,
            title="Python Developer",
            company="OpenAI",
            description="Build AI systems",
            required_skills=["Python"],
            location="Remote",
        )

    @patch("apps.resumes.views.extract_resume_text", return_value="Python Django")
    def test_upload_resume_extracts_text(self, mock_extract_resume_text):
        response = self.client.post(
            "/api/v1/resumes/",
            {
                "candidate": self.candidate.id,
                "job": self.job.id,
                "resume_file": SimpleUploadedFile(
                    "resume.pdf",
                    b"%PDF-1.4 fake pdf",
                    content_type="application/pdf",
                ),
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["extracted_text"], "Python Django")
        self.assertEqual(Resume.objects.count(), 1)
        mock_extract_resume_text.assert_called_once()

    def test_upload_resume_rejects_non_pdf(self):
        response = self.client.post(
            "/api/v1/resumes/",
            {
                "candidate": self.candidate.id,
                "job": self.job.id,
                "resume_file": SimpleUploadedFile(
                    "resume.txt",
                    b"plain text",
                    content_type="text/plain",
                ),
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("resume_file", response.data)
