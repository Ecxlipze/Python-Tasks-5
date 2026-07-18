from django.contrib.auth.models import User
from rest_framework.test import APITestCase


class CandidateApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="recruiter",
            password="password123",
        )
        self.client.force_authenticate(user=self.user)

    def test_create_candidate(self):
        response = self.client.post(
            "/api/v1/candidates/",
            {
                "full_name": "Jane Smith",
                "email": "jane@example.com",
                "phone": "1234567890",
                "experience": 4,
                "education": "BS Computer Science",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["full_name"], "Jane Smith")

    def test_create_candidate_rejects_invalid_email(self):
        response = self.client.post(
            "/api/v1/candidates/",
            {
                "full_name": "Jane Smith",
                "email": "not-an-email",
                "phone": "1234567890",
                "experience": -1,
                "education": "BS Computer Science",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.data)
