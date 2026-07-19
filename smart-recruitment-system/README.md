# Smart Recruitment System

Smart Recruitment System is a full-stack AI-enabled SaaS capstone for recruiters. It combines a Django REST backend with a Next.js frontend to manage jobs, candidates, resumes, and resume-to-job AI analysis.

## Live Features

- Recruiter registration and login with JWT authentication
- Protected dashboard, jobs, candidates, resumes, analysis, and settings pages
- CRUD for jobs and candidates
- Resume upload with automatic PDF text extraction
- AI resume-to-job matching
- Search, pagination, loading states, empty states, and toast feedback
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod
- Axios
- Sonner

### Backend
- Django 6
- Django REST Framework
- Simple JWT
- django-filter
- CORS headers
- PyPDF2
- WhiteNoise
- Gunicorn

## Architecture

The app uses a modular, service-oriented architecture.

### Backend structure

- `apps/accounts` - registration and auth support
- `apps/jobs` - job CRUD
- `apps/candidates` - candidate CRUD
- `apps/resumes` - resume upload and text extraction
- `apps/analysis` - AI analysis logic and API
- `core` - shared pagination and common backend helpers

### Frontend structure

- `app/(protected)` - authenticated pages
- `components/dashboard` - reusable dashboard UI pieces
- `components/layout` - shell, sidebar, navbar
- `components/ui` - shared shadcn components
- `services` - API clients
- `types` - shared TypeScript models
- `lib` - validation and utility helpers

## Folder Structure

```text
smart-recruitment-system/
├── backend/
│   ├── apps/
│   │   ├── accounts/
│   │   ├── analysis/
│   │   ├── candidates/
│   │   ├── jobs/
│   │   └── resumes/
│   ├── config/
│   └── core/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── lib/
│   ├── providers/
│   ├── services/
│   └── types/
└── docs/
    └── AI_ANALYSIS.md
```

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd smart-recruitment-system
```

### 2. Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

### Backend `backend/.env`

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
JWT_ACCESS_MINUTES=30
JWT_REFRESH_DAYS=7
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=100
SECURE_SSL_REDIRECT=False
SESSION_COOKIE_SECURE=False
CSRF_COOKIE_SECURE=False
SECURE_BROWSER_XSS_FILTER=False
SECURE_CONTENT_TYPE_NOSNIFF=True
X_FRAME_OPTIONS=DENY
DJANGO_LOG_LEVEL=INFO
DATABASE_URL=
OPENAI_API_KEY=
```

### Frontend `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

## API Documentation

Base URL:

```text
/api/v1
```

### Auth

- `POST /auth/register/`
- `POST /auth/login/`
- `POST /auth/refresh/`

### Jobs

- `GET /jobs/`
- `POST /jobs/`
- `GET /jobs/{id}/`
- `PUT /jobs/{id}/`
- `PATCH /jobs/{id}/`
- `DELETE /jobs/{id}/`

### Candidates

- `GET /candidates/`
- `POST /candidates/`
- `GET /candidates/{id}/`
- `PUT /candidates/{id}/`
- `PATCH /candidates/{id}/`
- `DELETE /candidates/{id}/`

### Resumes

- `GET /resumes/`
- `POST /resumes/`
- `GET /resumes/{id}/`
- `PUT /resumes/{id}/`
- `PATCH /resumes/{id}/`
- `DELETE /resumes/{id}/`

### Analysis

- `GET /analysis/`
- `POST /analysis/`
- `GET /analysis/{id}/`
- `PUT /analysis/{id}/`
- `PATCH /analysis/{id}/`
- `DELETE /analysis/{id}/`

## AI Analysis Workflow

The AI feature is a resume-to-job matching engine.

1. Recruiter selects a candidate and a job.
2. The backend finds the candidate's latest uploaded resume for that job.
3. Resume text is extracted from the PDF.
4. Skills are extracted using keyword matching.
5. Required skills from the job are compared with extracted skills.
6. Match score is calculated.
7. Missing skills are identified.
8. Recommendation and summary are generated.
9. Result is saved and shown in the frontend.

More detail is documented in [`docs/AI_ANALYSIS.md`](./docs/AI_ANALYSIS.md).

## Testing

Backend tests cover:

- Registration
- Login failure handling
- Job creation and validation
- Candidate creation and validation
- Resume upload and PDF validation
- AI service logic
- AI analysis endpoint validation

Run the backend test suite:

```bash
cd backend
./.venv/bin/python manage.py test
```

## Deployment

### Frontend

- Deploy to Vercel
- Set `NEXT_PUBLIC_API_URL` to the deployed backend URL

### Backend

- Deploy to Render
- Use `gunicorn config.wsgi:application`
- Set production environment variables in Render
- Run migrations and collect static files on deploy

## Production Notes

- `DEBUG` is controlled by environment variable
- `SECRET_KEY` comes from environment configuration
- `ALLOWED_HOSTS` and CORS origins are configurable
- Security flags are exposed through environment variables
- Logging is enabled for backend diagnostics

## Demo Notes
For the presentation, walk through:

- Login and protected navigation
- Creating and editing a job
- Adding a candidate
- Uploading a resume
- Running AI analysis
- Showing error handling and validation
