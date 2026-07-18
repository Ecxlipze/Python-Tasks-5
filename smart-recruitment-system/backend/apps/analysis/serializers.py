from rest_framework import serializers
from .models import Analysis

class AnalysisSerializer(serializers.ModelSerializer):

    class Meta:
        model = Analysis
        fields = [
            "id",
            "resume",
            "extracted_skills",
            "match_score",
            "recommendation",
            "summary",
            "created_at",
        ]
        read_only_fields = [
            "created_at",
        ]