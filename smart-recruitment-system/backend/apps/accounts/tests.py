from django.contrib.auth.models import User
from rest_framework.test import APITestCase


class RegisterApiTests(APITestCase):
    def test_register_creates_user(self):
        response = self.client.post(
            "/api/v1/auth/register/",
            {
                "username": "newrecruiter",
                "email": "new@example.com",
                "password": "password123",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username="newrecruiter").exists())

    def test_register_rejects_duplicate_username(self):
        User.objects.create_user(
            username="newrecruiter",
            email="old@example.com",
            password="password123",
        )

        response = self.client.post(
            "/api/v1/auth/register/",
            {
                "username": "newrecruiter",
                "email": "new@example.com",
                "password": "password123",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("username", response.data)

    def test_register_rejects_duplicate_email(self):
        User.objects.create_user(
            username="oldrecruiter",
            email="new@example.com",
            password="password123",
        )

        response = self.client.post(
            "/api/v1/auth/register/",
            {
                "username": "newrecruiter",
                "email": "new@example.com",
                "password": "password123",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.data)


class LoginApiTests(APITestCase):
    def test_login_rejects_invalid_credentials(self):
        response = self.client.post(
            "/api/v1/auth/login/",
            {
                "username": "missing",
                "password": "wrong",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 401)
