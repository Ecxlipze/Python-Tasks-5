from django.contrib import admin
from .models import Candidate


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "email",
        "experience",
        "education",
    )

    search_fields = (
        "full_name",
        "email",
    )

    list_filter = (
        "education",
    )