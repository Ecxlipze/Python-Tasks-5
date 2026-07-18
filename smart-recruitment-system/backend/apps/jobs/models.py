from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    recruiter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="jobs",
    )

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    required_skills = models.JSONField(default=list)
    location = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title