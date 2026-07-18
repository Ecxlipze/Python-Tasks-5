# AI Resume Analysis

## Overview

The Smart Recruitment System includes an AI-powered Resume-to-Job Matching feature. It helps recruiters quickly evaluate how well a candidate's resume matches a specific job description.

---

## How It Works

The analysis follows these steps:

1. The recruiter selects a candidate and a job.
2. The system finds the candidate's latest uploaded resume.
3. The resume text is extracted from the uploaded PDF.
4. Skills are identified from the extracted text.
5. The required skills from the selected job are compared with the extracted skills.
6. A match score is calculated.
7. Missing skills are identified.
8. Recommendations and a summary are generated.
9. The analysis result is saved and displayed in the frontend.

---

## Inputs

- Candidate
- Job
- Resume PDF

---

## Outputs

- Match Score
- Extracted Skills
- Missing Skills
- Recommendation
- Summary

---

## Match Score

The score is based on the percentage of required job skills found in the candidate's resume.

Example:

Required Skills

- Python
- Django
- REST API
- Docker

Resume Skills

- Python
- Django
- REST API

Match Score

75%

---

## Recommendation

The system generates recommendations based on the missing skills.

Example:

Missing Skills

- Docker

Recommendation

The candidate has a strong foundation but should improve Docker knowledge to better match this role.

---

## Current Limitations

- Uses keyword-based skill extraction.
- Does not understand synonyms or context.
- Assumes the latest uploaded resume is the correct one.
- Works best with well-structured PDF resumes.

---

## Future Improvements

- NLP-based skill extraction using spaCy.
- Semantic similarity with transformer models.
- LLM-generated recruiter feedback.
- Automatic ranking of candidates.
- Multi-language resume support.
