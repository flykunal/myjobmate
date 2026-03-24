# MyJobMate

MyJobMate is an AI-powered career guidance and roadmap platform for students and working professionals.

## Monorepo Structure

- `backend/`: Spring Boot REST API, MySQL/JPA persistence, JWT authentication, OpenAI orchestration
- `frontend/`: React + TypeScript application for learners and recruiters
- `docs/`: schema notes, API summaries, and AI prompt examples

## Implemented Foundation

This scaffold delivers a phase-1 MVP foundation with clear extension points for premium and marketplace modules:

- authentication and role-aware user model
- onboarding and AI roadmap generation
- topic-wise resource mapping
- progress tracking, daily tasks, streaks, and gamification
- resume analyzer
- job readiness and skill gap analysis
- subscription gating
- placeholder APIs for interview, mentor booking, portfolio, jobs, and recruiter search

## Run Locally

### Backend

```powershell
cd backend
mvn spring-boot:run
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```
