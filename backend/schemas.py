from pydantic import BaseModel
from datetime import datetime


class HealthReportCreate(BaseModel):
    latitude: float
    longitude: float
    category: str
    severity: str
    people_affected: int = 1
    reporter_type: str
    description: str | None = None


class HealthReportResponse(HealthReportCreate):
    id: int
    reported_at: datetime
    status: str

    class Config:
        from_attributes = True