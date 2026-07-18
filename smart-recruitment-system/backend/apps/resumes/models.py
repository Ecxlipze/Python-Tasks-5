from django.db import models
from apps.candidates.models import Candidate
from apps.jobs.models import Job

class Resume(models.Model):
    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="resumes"
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="resumes"
    )
    resume_file = models.FileField(upload_to="resumes/")
    extracted_text = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.candidate.full_name} - {self.job.title}"