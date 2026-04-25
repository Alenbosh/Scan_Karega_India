# Scan Karega India (SKI)

## AI-Powered Food Quality Monitoring Platform

**Tagline:** *Scan Karega India, Healthy Banega India.*

Scan Karega India (SKI) is a scalable AI-powered food quality monitoring platform that helps users analyze packaged food products using barcode scanning and image-based label analysis.

The platform provides instant insights about ingredients, additives, allergens, nutrition quality, and health score.

---

# Project Overview

SKI is designed as a production-ready SaaS platform.

Users can:

* Scan packaged food products
* Upload food label images
* Analyze ingredients using AI
* Understand food quality
* Get personalized recommendations
* Track scan history
* Receive healthier alternatives

---

# Key Features

## Food Barcode Scanning

Scan packaged products using barcode technology.

## OCR Label Detection

Upload food label images and extract ingredients automatically.

## AI Ingredient Analysis

Identify:

* Preservatives
* Artificial additives
* Hidden sugars
* Harmful ingredients
* Allergens

## Health Score Engine

Generate food quality score based on:

* Sugar level
* Sodium
* Processing level
* Nutritional value
* Artificial ingredients

## Recommendation Engine

Suggest healthier alternatives and similar products.

## User Dashboard

Users can:

* Save scan history
* Manage food preferences
* Track health decisions

## Admin Dashboard

Admins can:

* Manage products
* Monitor analytics
* View AI logs
* Manage users

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router
* Axios
* Redux Toolkit or Zustand
* Framer Motion

## Backend

* FastAPI
* Python
* REST APIs
* JWT Authentication
* Async API Architecture

## AI & Machine Learning

* Python
* TensorFlow / PyTorch
* Scikit-learn
* spaCy
* OpenCV
* OCR Engine

## Database

* MongoDB
* PostgreSQL
* Redis Cache

## Deployment

* Docker
* AWS
* Vercel
* Nginx
* CI/CD

---

# System Architecture

```text
Frontend → Backend API → AI Engine → Database → Results
```

### Workflow

1. User scans barcode or uploads food image
2. Backend processes request
3. AI engine extracts and analyzes data
4. Database stores results
5. Health score is generated
6. Recommendations are returned to user

---

# Folder Structure

```text
ski-platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   └── utils/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── auth/
│   │   └── database/
│
├── ai-engine/
│   ├── ocr/
│   ├── ingredient-parser/
│   ├── health-score/
│   ├── recommendation-engine/
│   └── model-training/
│
├── database/
│   ├── mongodb/
│   ├── postgres/
│   └── redis/
│
├── docker/
├── deployment/
├── docs/
├── .env
├── docker-compose.yml
└── README.md
```

---

# Core Modules

## Authentication Module

* User signup/login
* JWT token generation
* Role-based authorization

## Product Module

* Barcode lookup
* Product storage
* Ingredient retrieval

## AI Analysis Module

* OCR extraction
* NLP ingredient parsing
* Food scoring logic

## Recommendation Module

* Alternative product suggestions
* Personalized recommendations

## Analytics Module

* Usage statistics
* Food trends
* User activity tracking

---

# API Endpoints

## Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

## Product APIs

```http
GET /api/v1/products/{barcode}
POST /api/v1/products/analyze
```

## AI APIs

```http
POST /api/v1/ai/analyze-image
POST /api/v1/ai/health-score
```

## User APIs

```http
GET /api/v1/user/profile
GET /api/v1/user/history
```

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/your-username/ski-platform.git
cd ski-platform
```

---

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Database Setup

Install:

* MongoDB
* PostgreSQL
* Redis

Update credentials in `.env`

---

# Environment Variables

Create `.env` file:

```env
MONGO_URI=
POSTGRES_URI=
JWT_SECRET=
REDIS_URL=
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
OPENFOOD_API_KEY=
```

---

# Health Score Logic Example

```text
Sugar High → -2
High Sodium → -2
Natural Ingredients → +2
Low Additives → +1
```

Final Score:

```text
0–2 → Poor
3–5 → Moderate
6–8 → Good
9–10 → Excellent
```

---

# AI Workflow

```text
Image Upload
↓
OCR Extraction
↓
Ingredient Parsing
↓
Risk Detection
↓
Score Calculation
↓
Recommendation Engine
↓
User Dashboard
```

---

# Future Scope

* Mobile app support
* Wearable device integration
* Personalized nutrition planning
* Cloud AI inference
* Marketplace integration
* Government nutrition collaboration

---

# Scalability Goals

Designed to support:

* High traffic
* Microservice migration
* Horizontal scaling
* Cloud-native deployment
* AI model expansion

---

# Team

**Team Name:** Krānti
**Team Leader:** Koushal Kishor Vishwakarma

---

# License

MIT License

---

# Mission

Help users understand food quality instantly using AI-powered insights.

**Scan Karega India, Healthy Banega India.**
