# MyJobMate Architecture

## Backend

- Spring Boot application with feature-organized packages
- Stateless JWT-ready security configuration
- Phase 1 endpoints implemented for auth, profile, roadmap, resources, tracker, resume, subscription, job readiness, notifications
- Placeholder controllers added for premium and marketplace modules

## Frontend

- React + TypeScript + Vite application
- Sidebar-driven shell with learner and recruiter surfaces
- API client falls back to local mock data when backend is unavailable

## Growth Path

- Replace in-memory services with JPA repositories and MySQL-backed entities module-by-module
- Add OpenAI provider adapters for roadmap, interview, and resume analysis orchestration
- Layer actual billing, file storage, and background notification delivery next
