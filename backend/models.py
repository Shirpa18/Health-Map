from sqlalchemy import Column, Integer, Float, String, Text, DateTime
from datetime import datetime

from database import Base


class HealthReport(Base):
    __tablename__ = "health_reports"

    id = Column(Integer, primary_key=True, index=True)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    category = Column(String, nullable=False)
    severity = Column(String, nullable=False)

    people_affected = Column(Integer, default=1)

    reporter_type = Column(String, nullable=False)

    description = Column(Text, nullable=True)

    reported_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    status = Column(
        String,
        default="New"
    )