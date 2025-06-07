from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    test_name = Column(String, nullable=False)
    result = Column(String, nullable=False)
    error_category = Column(String, nullable=True)
    test_details = Column(String, nullable=True)
    game_version = Column(String, nullable=True)
    tester = Column(String, nullable=True)
    config = Column(String, nullable=True)
    bug_status = Column(String, nullable=True)
    comment = Column(String, nullable=True)
    time = Column(DateTime, default=datetime.now)