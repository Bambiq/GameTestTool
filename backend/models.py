from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    test_name = Column(String, nullable=False)
    result = Column(String, nullable=False)
    time = Column(DateTime, default=datetime.utcnow)