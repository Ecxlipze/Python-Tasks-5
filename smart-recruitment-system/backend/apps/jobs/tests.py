from django.contrib.auth.models import User
from rest_framework.test import APITestCase


class JobApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="recruiter",
            password="password123",
        )
        self.client.force_authenticate(user=self.user)

    def test_create_job_assigns_authenticated_recruiter(self):
        response = self.client.post(
            "/api/v1/jobs/",
            {
                "title": "Python Developer",
                "company": "OpenAI",
                "description": "Build AI systems",
                "required_skills": ["Python", "Django"],
                "location": "Remote",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["recruiter"], self.user.id)
        self.assertEqual(response.data["title"], "Python Developer")

    def test_create_job_rejects_missing_required_fields(self):
        response = self.client.post(
            "/api/v1/jobs/",
            {
                "title": "",
                "company": "",
                "description": "",
                "required_skills": [],
                "location": "",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("title", response.data)
        self.assertIn("company", response.data)
        self.assertIn("description", response.data)
        self.assertIn("location", response.data)
