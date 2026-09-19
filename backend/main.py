import sys
import os

# Add the project root to Python's import path
PROJECT_ROOT = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        ".."
    )
)

if PROJECT_ROOT not in sys.path:
    sys.path.append(PROJECT_ROOT)


from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import HealthReport
from schemas import HealthReportCreate, HealthReportResponse

from ai.analyze import analyze_reports


# --------------------------------------------------
# Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="HealthMap",
    description="Community Health Early-Warning & Investigation Platform",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Create database tables
# --------------------------------------------------

Base.metadata.create_all(
    bind=engine
)


# --------------------------------------------------
# Home
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "HealthMap Backend is Running"
    }


# --------------------------------------------------
# Create health report
# --------------------------------------------------

@app.post(
    "/reports",
    response_model=HealthReportResponse
)
def create_report(
    report: HealthReportCreate,
    db: Session = Depends(get_db)
):

    new_report = HealthReport(
        latitude=report.latitude,
        longitude=report.longitude,
        category=report.category,
        severity=report.severity,
        people_affected=report.people_affected,
        reporter_type=report.reporter_type,
        description=report.description
    )

    db.add(new_report)

    db.commit()

    db.refresh(new_report)

    return new_report


# --------------------------------------------------
# Get all health reports
# --------------------------------------------------

@app.get(
    "/reports",
    response_model=list[HealthReportResponse]
)
def get_reports(
    db: Session = Depends(get_db)
):

    reports = (
        db.query(HealthReport)
        .order_by(
            HealthReport.reported_at.desc()
        )
        .all()
    )

    return reports


# --------------------------------------------------
# AI CLUSTER ANALYSIS
# --------------------------------------------------

@app.get(
    "/analysis/clusters"
)
def get_clusters(
    db: Session = Depends(get_db)
):

    # Get all reports from SQLite
    reports = (
        db.query(HealthReport)
        .order_by(
            HealthReport.reported_at.desc()
        )
        .all()
    )

    # Convert SQLAlchemy objects
    # into dictionaries for AI analysis
    report_data = []

    for report in reports:

        report_data.append({

            "id": report.id,

            "latitude": report.latitude,

            "longitude": report.longitude,

            "category": report.category,

            "severity": report.severity,

            "people_affected": report.people_affected,

            "reporter_type": report.reporter_type,

            "description": report.description,

            "status": report.status
        })


    # Send real database reports
    # to the AI analysis engine
    analysis = analyze_reports(
        report_data
    )


    # Return AI results
    return analysis