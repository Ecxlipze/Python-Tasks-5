from django.contrib import admin
from .models import Analysis

@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    list_display = (
        "resume",
        "match_score",
        "recommendation",
        "created_at",
    )
    list_filter = (
        "recommendation",
    )
    search_fields = (
        "resume__candidate__full_name",
    )