from rest_framework import serializers
from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    experience = serializers.DecimalField(
        max_digits=4,
        decimal_places=1,
        min_value=0,
    )

    class Meta:
        model = Candidate
        fields = "__all__"
