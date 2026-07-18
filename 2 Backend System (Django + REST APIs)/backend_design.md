# Section 2 – Backend System

## Task 1 – Database Schema

### Database Tables

| Table | Purpose |
|--------|---------|
| User | Recruiter authentication and account management |
| Job | Stores job postings created by recruiters |
| Candidate | Stores candidate information |
| Resume | Stores uploaded resumes and extracted text |
| Analysis | Stores AI-generated resume analysis and matching results |

---

## Relationships

- One User can create many Jobs.
- One Job can have many Resume submissions.
- One Candidate can upload multiple Resumes.
- Each Resume has one Analysis record.

---

## Database Design Goals

- Normalize data to reduce duplication.
- Maintain clear relationships using foreign keys.
- Support scalability and future feature expansion.
- Separate AI analysis data from uploaded resume data.