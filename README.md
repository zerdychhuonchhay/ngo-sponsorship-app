NGO Sponsorship Management App
Mission Statement
This project is a centralized, secure web application designed to replace manual spreadsheets and paper documents for managing student sponsorships, financials, and compliance. Its goal is to improve operational efficiency and provide staff with quick, reliable access to critical information.

Core MVP Features
The initial version of this application, built with a "Django Admin First" strategy, focuses on providing a robust backend for administrative staff. The core features include:

Student Management: Full CRUD (Create, Read, Update, Delete) capabilities for student records.

Historical Records: Ability to track academic reports and monthly follow-up records for each student.

Financial Tracking: A simple system for logging income and expenses, with the ability to link transactions to specific students.

Compliance Management: A module for tracking government filing due dates, submission dates, and storing digital copies of documents.

Technology Stack
Backend: Python with the Django Framework

Frontend: React (to be built in Phase 2)

Database: PostgreSQL

Deployment: Railway.app

Deployment
The backend API for this project is live and deployed on Railway.

Live API Base URL: https://ngo-sponsorship-app-production.up.railway.app/

Status: Phase 1 (Backend API) is complete and verified.

Local Development Setup
To run this project on your local machine, please follow these steps.

Clone the Repository

git clone <your-repository-url>
cd ngo-sponsorship-app

Set Up and Run the Backend

cd backend
python -m venv venv
# Activate the virtual environment
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

The backend server will be running at http://127.0.0.1:8000.

Set Up and Run the Frontend (Future)

cd frontend
npm install
npm start

Getting Started
For a complete breakdown of the project goals, learning plan, and technical architecture, please see the full_project_plan.md and ngo_mvp_plan.md documents.