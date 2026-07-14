
# Task 5: Minimum Viable Product (MVP)

## MVP Definition

The Minimum Viable Product (MVP) of the Smart Recruitment System is a functional AI-powered recruitment platform that allows recruiters to manage job postings and evaluate candidates using automated resume analysis.

The MVP focuses on delivering the core recruitment workflow from user authentication to AI-powered candidate ranking while excluding advanced features that can be added in future releases.

## Core MVP Features

### User Authentication
- Recruiter Registration
- Recruiter Login
- JWT Authentication

### Job Management
- Create Job
- View Jobs
- Edit Job
- Delete Job

### Resume Management
- Upload Resume (PDF)
- Store Resume
- View Uploaded Resumes

### AI Resume Analysis
- Extract Resume Text
- Extract Candidate Skills
- Compare Resume with Job Description
- Calculate Match Score
- Generate Candidate Ranking

### Dashboard
- View Jobs
- View Candidates
- View Resume Analysis Results

### Backend
- Django REST APIs
- PostgreSQL Database
- Secure Authentication
- Input Validation

### Frontend
- Responsive User Interface
- Resume Upload Page
- Job Management Pages
- Candidate Dashboard
- Analysis Results Page

---

## Features Excluded from MVP

The following features will be implemented in future versions:

- Email Notifications
- Resume Summarization
- Interview Question Generator
- Advanced Analytics
- Charts and Graphs
- Dark Mode
- Bulk Resume Upload
- Export Reports (PDF/Excel)
- Multi-language Support
- Activity Logs

---

## MVP Goal

The primary goal of the MVP is to demonstrate a complete end-to-end recruitment workflow where a recruiter can create a job posting, upload candidate resumes, automatically analyze them using AI, and identify the most suitable candidates based on their match score.