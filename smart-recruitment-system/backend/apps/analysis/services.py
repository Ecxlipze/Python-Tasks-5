import re

from apps.jobs.models import Job
from apps.resumes.models import Resume


def extract_skills(resume_text: str, job: Job) -> list[str]:
    text = resume_text.lower()
    skills: list[str] = []
    source_skills = list(job.required_skills or [])

    if job.description:
        source_skills.extend(re.split(r"[,\n/|]", job.description))

    for skill in source_skills:
        cleaned = skill.strip()
        if not cleaned:
            continue

        normalized = cleaned.lower()
        if normalized in text and normalized not in [s.lower() for s in skills]:
            skills.append(cleaned.title())

    return skills


def calculate_match_score(
    extracted_skills: list[str],
    required_skills: list[str],
) -> float:
    required = [skill for skill in required_skills if skill]

    if not required:
        return 0.0

    matched = {
        skill.lower()
        for skill in extracted_skills
        if skill.lower() in {required_skill.lower() for required_skill in required}
    }

    return round((len(matched) / len(required)) * 100, 2)


def find_missing_skills(
    extracted_skills: list[str],
    required_skills: list[str],
) -> list[str]:
    extracted = {skill.lower() for skill in extracted_skills}
    return [
        skill
        for skill in required_skills
        if skill and skill.lower() not in extracted
    ]


def build_recommendation(match_score: float) -> tuple[str, str]:
    if match_score >= 80:
        return (
            "Strong Match",
            "Candidate is highly aligned with the role.",
        )

    if match_score >= 50:
        return (
            "Review Further",
            "Candidate is a moderate fit and should be reviewed.",
        )

    return (
        "Not a Strong Match",
        "Candidate needs additional alignment for this role.",
    )


def build_summary(base_summary: str, missing_skills: list[str]) -> str:
    if not missing_skills:
        return base_summary

    return f"{base_summary} Missing skills: {', '.join(missing_skills)}."


def analyze_resume(resume: Resume, job: Job) -> dict:
    extracted_skills = extract_skills(resume.extracted_text, job)
    required_skills = [skill for skill in (job.required_skills or []) if skill]
    match_score = calculate_match_score(extracted_skills, required_skills)
    recommendation, base_summary = build_recommendation(match_score)
    missing_skills = find_missing_skills(extracted_skills, required_skills)
    summary = build_summary(base_summary, missing_skills)

    return {
        "resume": resume,
        "extracted_skills": extracted_skills,
        "match_score": match_score,
        "recommendation": recommendation,
        "summary": summary,
    }
