# Resume Analyzer (AI Interview Coach)

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000?logo=vercel&logoColor=white)](https://resume-analyzer-nine-xi.vercel.app/)  
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://resume-analyzer-3e1q.onrender.com)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)  
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

**Resume Analyzer** is a full-stack AI interview prep platform that analyzes a candidate’s resume and job description to generate a tailored interview strategy, skill gaps, and a readiness roadmap—then produces a polished PDF resume.

---

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Key Features](#key-features)
4. [Live Demo](#live-demo)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Reference](#api-reference)
8. [Project Structure](#project-structure)
9. [Screenshots](#screenshots)
10. [Future Improvements](#future-improvements)
11. [Author](#author)

---

## Overview
**Target Users:** Job seekers, students, and professionals preparing for interviews.  
**Problem Solved:** Manually mapping job requirements to personal experience is slow and error-prone. This app automates analysis and provides actionable prep steps, personalized questions, and a resume PDF.

---

## Tech Stack

**Frontend**
- React 19 (Vite)
- React Router
- SCSS
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT + Cookies (Auth)
- Multer (file upload)
- pdf-parse (resume text extraction)
- Puppeteer / Chromium (PDF generation on Render)
- Google GenAI + Zod (structured AI responses)

---

## Key Features
- ?? **Authentication** (register, login, logout, get-me)
- ?? **AI Interview Report**: technical + behavioral questions, skill gaps, and roadmap
- ?? **Resume PDF Generator** with professional formatting
- ?? **All Reports Dashboard** with quick access and history

---

## Live Demo
- **Frontend:** https://resume-analyzer-nine-xi.vercel.app  
- **Backend:** https://resume-analyzer-3e1q.onrender.com  

---

## Installation

### 1) Clone
```bash
git clone https://github.com/AdityaKumar3594/Resume-Analyzer.git
cd Resume-Analyzer
```

### 2) Backend Setup
```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_key
PORT=3000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run backend:
```bash
npm run dev
```

### 3) Frontend Setup
```bash
cd ../Frontend
npm install
```

Create `Frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

Run frontend:
```bash
npm run dev
```

---

## Usage
1. Register or login.
2. Upload your resume **or** write a quick self-description.
3. Paste a job description.
4. Generate the interview report.
5. Review questions, skill gaps, roadmap.
6. Download the resume PDF.

---

## API Reference

**Auth**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/auth/get-me`

**Interview**
- `POST /api/interview`  
  - `multipart/form-data`: `resume` (file), `jobDescription`, `selfDescription`
- `GET /api/interview/`
- `GET /api/interview/report/:interviewId`
- `POST /api/interview/resume/pdf/:interviewReportId`

---

## Project Structure

```
Resume-Analyzer/
+- Backend/
¦  +- src/
¦  ¦  +- app.js
¦  ¦  +- config/
¦  ¦  +- controllers/
¦  ¦  +- middlewares/
¦  ¦  +- models/
¦  ¦  +- routes/
¦  ¦  +- services/
¦  +- package.json
¦
+- Frontend/
¦  +- src/
¦  ¦  +- features/
¦  ¦  ¦  +- auth/
¦  ¦  ¦  +- interview/
¦  ¦  +- app.routes.jsx
¦  ¦  +- App.jsx
¦  ¦  +- main.jsx
¦  +- style.scss
¦  +- package.json
+- .gitignore
```

---

## Screenshots
- Add screenshots or GIFs here  
- Demo: https://resume-analyzer-nine-xi.vercel.app

---

## Future Improvements
- Multi-resume versioning
- Role-specific interview templates (SWE, PM, Data, etc.)
- Export report as PDF
- Analytics for improvement tracking
- Team/coach collaboration mode

---

## Author
**Aditya Kumar**
