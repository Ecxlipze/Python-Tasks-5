from django.db import models
from apps.resumes.models import Resume

class Analysis(models.Model):
    resume = models.OneToOneField(
        Resume,
        on_delete=models.CASCADE,
        related_name="analysis"
    )
    extracted_skills = models.JSONField(default=list)
    match_score = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )
    recommendation = models.CharField(
        max_length=100
    )
    summary = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.resume.candidate.full_name} ({self.match_score}%)"