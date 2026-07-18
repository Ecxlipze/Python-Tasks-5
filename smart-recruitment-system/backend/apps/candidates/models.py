from django.db import models

class Candidate(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)

    experience = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        default=0
    )

    education = models.CharField(max_length=200)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name