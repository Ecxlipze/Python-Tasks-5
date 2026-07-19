# Smart Recruitment System Presentation Script

## 1. Introduction

Hello, my name is Rohan, and this is my Smart Recruitment System.

The project is an AI-enabled recruitment platform built to help recruiters manage jobs, candidates, resumes, and resume-to-job matching in one place.

## 2. Problem Statement

Recruitment teams usually deal with scattered data, manual resume review, and slow hiring decisions.

This system solves that by centralizing the workflow:

- Recruiters can create and manage jobs
- Candidates can be stored and searched easily
- Resumes can be uploaded and processed automatically
- AI can analyze how well a resume matches a job description

## 3. Architecture

The application is built with a clean full-stack architecture.

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Django
- Django REST Framework
- Simple JWT for authentication
- Modular apps for jobs, candidates, resumes, analysis, and accounts

### Data and AI

- SQLite for local development
- PostgreSQL-ready production configuration
- PDF text extraction for resumes
- AI analysis service for skill matching

### Key Design Choices

- Protected frontend routes for authenticated users
- Service layer for business logic
- Shared reusable UI components
- Centralized configuration and validation

## 4. Live Demo Flow

### Step 1: Register and Login

I first create a recruiter account, then log in using JWT authentication.

### Step 2: Dashboard

The dashboard shows the main summary view of the system, including recent activity and quick access to key modules.

### Step 3: Create a Job

I create a new job by entering the title, company, location, and description.

### Step 4: Add a Candidate

I create a candidate profile with name, email, phone, experience, and education.

### Step 5: Upload a Resume

I upload a PDF resume, and the backend extracts the text automatically.

### Step 6: Run AI Analysis

I select a candidate and job, then run the AI analysis.

The system returns:

- Match score
- Extracted skills
- Missing skills
- Recommendation
- Summary

### Step 7: Review Results

The analysis result is saved and displayed in the UI so the recruiter can make a faster hiring decision.

## 5. AI Feature

The AI feature is a resume-to-job matching engine.

How it works:

- The system reads the extracted resume text
- It identifies relevant skills from the resume
- It compares those skills with the job requirements
- It calculates a match score
- It identifies missing skills
- It generates a recommendation and summary

This makes resume screening faster and more consistent.

## 6. Challenges Faced

### JWT Authentication

Setting up secure login, logout, protected routes, and expired token handling required careful frontend and backend coordination.

### File Uploads

Resume upload needed multipart handling, validation, and PDF text extraction.

### AI Refactoring

The AI logic had to be moved into a standalone service to keep the architecture clean and scalable.

### Reusable UI

The CRUD forms and dialogs needed to be reusable, responsive, and consistent across modules.

### Error Handling

The app needed clear validation messages, loading states, empty states, and failure handling so users never hit a dead end.

## 7. Conclusion

This project combines a modern frontend, a modular Django backend, and a practical AI feature to improve the recruiter workflow.

It demonstrates:

- Full-stack integration
- Authentication and route protection
- CRUD operations
- Resume processing
- AI-assisted decision support
- Clean architecture and maintainability

Future improvements could include charts, richer analytics, role expansion, and more advanced AI skill extraction.
